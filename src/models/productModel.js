import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    description: {
        type: String,
        trim: true,
        maxlength: 200
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
