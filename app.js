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

const app = express()

// ---------------------------
// 🔐 Seguridad Global
// ---------------------------

// Trust proxy para rate limiting detrás de un proxy (Vercel, Railway, etc.)
app.set("trust proxy", 1);

// Deshabilitar header X-Powered-By
app.disable("x-powered-by");

// Helmet (seguridad HTTP)
app.use(helmet({
    crossOriginResourcePolicy: false,
}));

// ---------------------------
// 📝 Logs y performance
// ---------------------------

// Logs de requests
app.use(morgan("dev"));  // cambiar a 'combined' en producción

// Compresión de respuestas
app.use(compression());

// ---------------------------
// 🌍 CORS
// ---------------------------

app.use(cors({ 
    origin: "*", // Cambiar el dominio según sea necesario en producción ["https://midominio.com"]
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))

// ---------------------------
// 📦 Parseo del body
// ---------------------------

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ---------------------------
// 🛢 Conexión a DB
// ---------------------------

connectDB()

// ---------------------------
// 🔒 Rate Limit GLOBAL excepto login
// ---------------------------

app.use("/api", (req, res, next) => {
    if (req.path === "/users/login") {
        return next();
    }
    apiLimiter(req, res, next);
});

// ---------------------------
// 🚀 Rutas
// ---------------------------

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);

// ---------------------------
// 🟥 404 - Handler de rutas no encontradas
// ---------------------------

app.use((req, res, next) => {
    next({
    status: 404,
    message: `No se encontró la ruta: ${req.originalUrl}`
    })
});

// ---------------------------
// ⚠️ Manejo global de errores
// ---------------------------

app.use(errorHandler);

// ---------------------------
// 🚦 Iniciar servidor
// ---------------------------

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})

export default app;