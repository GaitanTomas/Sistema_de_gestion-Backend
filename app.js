import express from 'express'
import { connectDB } from './src/config/db.js'
import { PORT } from './src/config/config.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import { errorHandler } from './src/middleware/errorHandler.js'
import { apiLimiter } from './src/middleware/rateLimit.js'


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

// Rate limiter para toda la API excepto login
app.use("/api", (req, res, next) => {
    if (req.path === "/users/login") {
        return next(); // excluir login del rate limit global
    }
    apiLimiter(req, res, next);
});

// Rutas
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);

// Middleware de manejo de errores
app.use(errorHandler);

// Puerto de escucha
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})

export default app;