import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // Corregido: usa .tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Definir un tema simple de MUI (opcional, pero recomendado)
const theme = createTheme({
    palette: {
        mode: 'dark', // Si quieres el modo oscuro por defecto
        primary: {
            main: '#00bcd4', // Azul cian para un look moderno
        },
        secondary: {
            main: '#ff9800', 
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 1. Proveedor de Tema MUI */}
    <ThemeProvider theme={theme}>
      {/* 2. Reseteo de CSS para todos los navegadores */}
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);