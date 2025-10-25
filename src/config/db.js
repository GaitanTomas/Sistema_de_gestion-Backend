import mongoose from 'mongoose'
import { MONGODB_URI, DB_NAME } from './config.js'

// Crea la conexión a la base de datos
export const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log("Database connected")
    } catch (error) {
        console.error("Error connecting to database", error)
        // Para salir de la ejecución
        process.exit(1)
    }
}