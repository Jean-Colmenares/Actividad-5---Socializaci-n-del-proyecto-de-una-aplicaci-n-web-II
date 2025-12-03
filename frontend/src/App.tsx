import { useState, useEffect } from "react";
import ProductForm from ".//components/frontend/src/components/ProductForm"; // Asegúrate de que las rutas sean correctas
import ProductList from "./components/frontend/src/components/ProductList"; // Asegúrate de que las rutas sean correctas

// Importamos componentes de MUI
import { Container, Typography, Divider, Box } from "@mui/material";

// [Opcional] Interfaz tipada para asegurar la compatibilidad con ProductList
interface Product {
  id: string; 
  name: string;
  category: string;
  quantity: number;
  price: number;
}

function App() {
  // Aquí usamos 'Product[]' para tipar el estado
  const [products, setProducts] = useState<Product[]>([]); 
  const API_URL = "http://localhost:5000/api/products";

  // Cargar productos
  const loadProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data as Product[]); // Casteamos los datos para que coincidan con la interfaz
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    // 1. Reemplazamos el <div> principal con <Container>
    // maxWidth="xl" usa el ancho máximo de la pantalla con el sistema de espaciado de MUI.
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}> 
      
      {/* 2. Reemplazamos el <h1> con <Typography> para usar la fuente de Material Design */}
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
        🛒 Gestión de Inventario
      </Typography>

      {/* Usamos Box para agrupar y centrar el formulario si es necesario */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ProductForm reload={loadProducts} />
      </Box>

      {/* 3. Reemplazamos el <hr> con <Divider> */}
      <Divider sx={{ my: 4 }} />

      <ProductList products={products} reload={loadProducts} />
    </Container>
  );
}

export default App;