import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(indexRoutes);
app.use(productsRoutes);

export default app;
