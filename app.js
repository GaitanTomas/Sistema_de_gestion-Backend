import express from 'express'
import { connectDB } from './src/config/db.js'
import { PORT } from './src/config/config.js'


// Instancia del servidor de express
const app = express()

// Conexión a la base de datos
connectDB()

// Puerto de escucha
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})