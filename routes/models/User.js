const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },

    type: {
        type: String
    },

    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', userSchema);