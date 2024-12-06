import express from 'express';
import path from "path";
//import ejs from 'ejs'//views como express tiene integracioj por defecto se puede obviar la importacion

import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';

import config from "./config.js";
import { connectPoolPC } from "./database/index.js";
import noticesRoutes from './routes/notices.routes.js'

const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



//settings
let port 
app.set('views', path.join(__dirname, 'views'))//views
app.set('view engine', 'ejs')//views
app.set('port', config.port )


//MIDDLEWARE
app.use(express.json()) //recibir datos formato json
app.use(express.urlencoded({extended: false}))//recibir datos que vengan desde formularios html PODER ENTENDER LO QUE EL CLIENTE ENVIA


app.use(noticesRoutes)

//STATICS
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

//conectar la base de datos
connectPoolPC()


console.log(path.join(__dirname, 'views'));

console.log(__dirname);
console.log(__filename);

export default app