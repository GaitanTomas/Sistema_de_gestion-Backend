import express from 'express'
import { connectDB } from './src/config/db.js'
import { PORT } from './src/config/config.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";


// Instancia del servidor de express
const app = express()

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// Conexión a la base de datos
connectDB()

// bodyParser
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

// Rutas
app.use("/users", userRoute);
app.use("/category", categoryRoute);

// Puerto de escucha
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})