import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 25,
        minlength: 2,
        trim: true,
        lowercase: true
    },

    description: {
        type: String,
        maxlength: 200,
        trim: true,
        lowercase: true
    },

}, {timestamps: true} )

export default mongoose.model("category", categorySchema)