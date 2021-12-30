const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const fs = require('fs');

// @route POST   api/users
// @desc        register user
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid mail').isEmail(),
    check('password', 'Please enter a password with at least 6 characters').isLength({ min: 6 }),
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    //£
    const { name, email, password, type} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: [{ msg:'This email already exist' }] });
        }
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        //£
        user = new User({ name, email, password, avatar, type });

        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);
        user.password = password;
        
        user.save();
        //res.send('User Registered');
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            }
        );




        //?????
        try {
            let utilisateur = { 
                name: name,
                email: email, 
                password: password,
                type: type
            };
            const utilisateurs = await User.find();
            utilisateurs.push(utilisateur);

            let students = utilisateurs.filter(e => e.type == "student");
            let teachers = utilisateurs.filter(e => e.type == "teacher");
            let managers = utilisateurs.filter(e => e.type == "manager");


            //students
            let data = {"users": students};
            let alldata = JSON.stringify(data, null, 2);
            fs.writeFile('students.json', alldata, (err) => {
                if (err) throw err;
                console.log('Data written to file s');
                //console.log(data);
            });

            //teachers
            data = {"users": teachers};
            alldata = JSON.stringify(data, null, 2);

            fs.writeFile('teachers.json', alldata, (err) => {
                if (err) throw err;
                console.log('Data written to file u');
                //console.log(data);
            });

            //managers
            data = {"users": managers};
            alldata = JSON.stringify(data, null, 2);
            fs.writeFile('managers.json', alldata, (err) => {
                if (err) throw err;
                console.log('Data written to file m');
                //console.log(data);
            });




        } catch(err) {
            console.error(err.message);
        }
        //?????




    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error'); 
    }
    //res.send('User routes');
});

module.exports = router;