import express from "express";
import dotenv from "dotenv";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/mongoose.js";
import chronoRoutes from './routes/chronoRouter.js';

dotenv.config();
connectDB();
const APP_PORT = process.env.APP_PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const app = express();
const corsOptions = {
    origin: CLIENT_URL, //para despliegue
    // origin: 'http://localhost:5173', //para desarrollo local
    credentials: true
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json()); // para API (formato json)

app.use(express.urlencoded({ extended: true })); // para Vistas (formato formulario)

app.use('/chrono', chronoRoutes);

app.use("/", router);

app.listen(3000, () => {
    console.log(`Backend conectado al puerto ${APP_PORT}`);
})