import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// regex para validar email
const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 2,
        trim: true,
        lowercase: true,
    },

    lastName: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 2,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 6,
        trim: true,
        lowercase: true,
        unique: true,
        match: [emailRegex, "El email no es válido"]
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true
    }

}, {timestamps: true} )

// Encriptamos la password
userSchema.pre("save", function (next) {
    if (!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export default mongoose.model("User", userSchema)
