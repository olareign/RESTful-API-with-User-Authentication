const mongoose = require('mongoose');
const validator = require('validator');
const customError = require('../errors');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: [true, 'Username already exists'],
        minlength: [3, 'Username is too short'],
        maxlength: [15, 'Username is too long'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please input a password to secure your account'],
        validate: {
            validator: function (value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>/?]).{8,}$/;
                return passwordRegex.test(value);
            },
            message: 'Your password must be at least 8 characters long, contain at least one number, and have a mixture of uppercase and lowercase letters.'
        }
    }
}, { timestamps: true });

UserSchema.pre('save', async function() {
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

module.exports = mongoose.model('User', UserSchema);

