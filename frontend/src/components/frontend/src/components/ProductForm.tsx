import { useState } from "react";
// Importamos componentes de Material UI
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";

interface ProductFormProps {
  reload: () => void;
}

interface FormData {
  name: string;
  category: string;
  quantity: string;
  price: string;
}

function ProductForm({ reload }: ProductFormProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    category: "",
    quantity: "",
    price: "",
  });

  const API_URL = "http://localhost:5000/api/products";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica para evitar enviar si el nombre está vacío
    if (!form.name.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
      }),
    });

    reload();
    setForm({ name: "", category: "", quantity: "", price: "" });
  };

  return (
    // Container y Box para centrar y agrupar el formulario
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        📝 Agregar Nuevo Producto
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        {/* Usamos TextField de MUI en lugar de <input> */}
        <TextField
          label="Nombre del Producto"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Categoría"
          name="category"
          value={form.category}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Cantidad"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ min: 0 }} // Aseguramos que la cantidad no sea negativa
        />

        <TextField
          label="Precio"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          required
          inputProps={{ step: "0.01", min: 0 }} // Permite decimales y no permite negativos
        />

        <Button type="submit" variant="contained" color="primary">
          ➕ Guardar Producto
        </Button>
      </Box>
    </Container>
  );
}

export default ProductForm;