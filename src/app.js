import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import path from "path";
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';

import config from "./config.js";
import { connectPoolPC } from "./database/index.js";
import noticesRoutes from './routes/notices.routes.js';
import performanceRoutes from './routes/performance.routes.js'
import rpa_bot from './telegram/bot.js';

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Settings
app.set('views', path.join(__dirname, 'views')); // Configuración del directorio de vistas
app.set('view engine', 'ejs'); // Configuración del motor de vistas
app.set('port', config.port); // Configuración del puerto

// Middleware
app.use(express.json()); // Para recibir datos en formato JSON
app.use(express.urlencoded({ extended: false })); // Para recibir datos desde formularios HTML

// Rutas
app.use(noticesRoutes);
app.use(performanceRoutes)

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a la base de datos
connectPoolPC()

// Integración con Socket.io 
io.on('connection', (socket) => { 
    console.log('A user connected'); 
    socket.on('disconnect', () => { 
        console.log('User disconnected'); 
    }); 
}); 

// Exporta el servidor 
export { server, io }; 
server.listen(app.get('port'), () => { 
    console.log(`Server running on port ${app.get('port')}`);
});
    

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

console.log(path.join(__dirname, 'views'));
console.log(__dirname);
console.log(__filename);

export default app;