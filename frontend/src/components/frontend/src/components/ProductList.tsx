import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Importamos el ícono

interface Product {
  id: string; // Cambiado a string para coincidir con nanoid
  name: string;
  category: string;
  quantity: number;
  price: number;
}

interface ProductListProps {
  products: Product[];
  reload: () => void;
}

function ProductList({ products, reload }: ProductListProps) {
  const API_URL = "http://localhost:5000/api/products";

  const deleteProduct = async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    reload();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        📦 Inventario Actual ({products.length} productos)
      </Typography>

      {products.length === 0 ? (
        <Typography color="textSecondary">No hay productos registrados.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main', '& > *': { color: 'white' } }}>
                <TableCell>Nombre</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio (COP)</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell align="right">{p.quantity}</TableCell>
                  <TableCell align="right">${p.price.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteProduct(p.id)}
                      startIcon={<DeleteIcon />} // Usamos el ícono de basura
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default ProductList;