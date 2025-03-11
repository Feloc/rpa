import { config } from "dotenv"; //config lo que hara es que cuando se ajecuta va intentarl leer las varibles de entorno que esten definidas en nuestro pc
config()

//varible de entorno

export default {
    port: process.env.PORT || 5000,
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASS || '',
    dbServer: process.env.DB_SERVER || '',
    dbPort: process.env.DB_PORT || '',
    dbDatabase: process.env.DB_DATABASE || '',

    //telegram
    token: process.env.TOKEN || '',
    baseUrl: 'http://localhost:5000'
}