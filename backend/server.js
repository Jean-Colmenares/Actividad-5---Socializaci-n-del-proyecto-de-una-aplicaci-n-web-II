// server.js
import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { nanoid } from "nanoid";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import dotenv from "dotenv";

dotenv.config();

// __dirname fix for ES Modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar Express
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Base de datos
const DB_FILE = process.env.DB_FILE || path.join(__dirname, "db.json");
const adapter = new JSONFile(DB_FILE);
const db = new Low(adapter, { products: [] });

async function initDB() {
  await db.read();
  if (!db.data) db.data = { products: [] };
  await db.write();
}
await initDB();

// ------------------------- RUTAS API -------------------------

app.get("/api/products", async (req, res) => {
  await db.read();
  res.json(db.data.products);
});

app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  await db.read();
  const product = db.data.products.find((x) => x.id === id);
  if (!product) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(product);
});

app.post("/api/products", async (req, res) => {
  const { name, category = "", quantity = 0, price = 0 } = req.body;
  if (!name) return res.status(400).json({ message: "El nombre es obligatorio" });

  const product = {
    id: nanoid(8),
    name,
    category,
    quantity: Number(quantity),
    price: Number(price),
  };

  await db.read();
  db.data.products.push(product);
  await db.write();

  res.status(201).json(product);
});

app.put("/api/products/:id", async (req, res) => {
  const id = req.params.id;

  await db.read();
  const index = db.data.products.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Producto no encontrado" });

  const updated = {
    ...db.data.products[index],
    ...req.body,
  };

  updated.quantity = Number(updated.quantity);
  updated.price = Number(updated.price);

  db.data.products[index] = updated;
  await db.write();

  res.json(updated);
});

app.delete("/api/products/:id", async (req, res) => {
  const id = req.params.id;

  await db.read();
  const before = db.data.products.length;

  db.data.products = db.data.products.filter((p) => p.id !== id);

  if (db.data.products.length === before) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  await db.write();
  res.status(204).send();
});

// ------------------------- FRONTEND -------------------------
/*
const FRONT_BUILD = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(FRONT_BUILD));
*/
// ------------------------- 404 PARA TODO LO NO DEFINIDO -------------------------
/*
// ELIMINAR ESTO:
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});
*/

// AÑADIR ESTA LÓGICA (CORRECCIÓN):
app.use((req, res) => {
    // Si la solicitud es a la API pero no coincide con ninguna ruta anterior,
    // devolvemos el 404 de la API.
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ message: "Ruta de API no encontrada" });
    }
    
    // Si la solicitud no es a la API (ej: la raíz /), la ignoramos.
    // En desarrollo, el navegador cargará la interfaz de React desde el puerto de Vite (ej. 5173).
    // Si alguien accede a 5000/, simplemente no responde, o puedes cambiar a res.status(200).send("API Online")
    
    return res.status(200).json({ message: "API Inventory Online" });
});
// ------------------------- SERVIDOR -------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
  console.log(`Swagger en http://localhost:${PORT}/api-docs`);
});

