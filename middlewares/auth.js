//exports
const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function
module.exports = function(req, res, next) {
    //Récuperer token
    const token = req.header('x-auth-token');
    //Si pas de token
    if(!token) return res.status(401).json({msg: 'No token, authorization denied'});
    //Sinon check token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //recption data
        req.user = decoded.user;
        //next
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token not valid' });
    }
}