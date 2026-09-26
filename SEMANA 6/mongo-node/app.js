import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import connectDB from "./src/db/database.js";
import dotenv from "dotenv";

import homeRoutes from "./src/routes/home.routes.js";
import postRoutes from "./src/routes/post.routes.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config(); // Carga las variables desde .env

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/", homeRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).render("error", {
    status: 404,
    title: "Página no encontrada",
    message: "La dirección solicitada no existe en este sitio.",
  });
});

await connectDB(); // Conexión a la base de datos

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
