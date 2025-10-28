import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
        match: /^\S+@\S+\.\S+$/
    },

    password: {
        type: String,
        required: true,
        match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/
    }

}, {timestamps: true} )

// Encriptamos la password
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
} )

export default mongoose.model("user", userSchema)
