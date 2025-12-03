// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: 'API REST para gestionar inventario (CRUD) - Proyecto Aplicación Web II'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Servidor local' }
    ]
  },
  apis: ['./server.js']
};

// Generar la especificación OpenAPI
const swaggerSpec = swaggerJSDoc(options);

// Exportar correctamente para ES Modules
export default swaggerSpec;
