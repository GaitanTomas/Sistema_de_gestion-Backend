import express from 'express'
import { connectDB } from './src/config/db.js'
import { PORT } from './src/config/config.js'
import cors from 'cors'
import userRoute from "./src/routes/userRoute.js";
import categoryRoute from "./src/routes/categoryRoute.js";
import productRoute from "./src/routes/productRoute.js";
import { errorHandler } from './src/middleware/errorHandler.js'
import { apiLimiter } from './src/middleware/rateLimit.js'
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";


// Instancia del servidor de express
const app = express()

// Trust proxy para rate limiting detrás de un proxy (como Vercel, Railway, etc.)
app.set("trust proxy", 1);

// Deshabilitar header X-Powered-By por seguridad
app.disable("x-powered-by");

// Seguridad con Helmet
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// Logs de requests
app.use(morgan("dev"));  // cambiar a 'combined' en producción

// Compresión de respuestas
app.use(compression());

// CORS
app.use(cors({ 
    origin: "*", // Cambiar el dominio según sea necesario para producción ["https://midominio.com"]
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// Conexión a la base de datos
connectDB()

// Middlewares para parseo de body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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