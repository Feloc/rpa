import sql from "mssql";
//import sql, {ConnectionPool} from "mssql";
import config from '../config.js'

const dbsettings = {
  user : config.dbUser,
  password : config.dbPassword,
  server : config.dbServer,
  port: parseInt(config.dbPort, 10) || 1433,
  database: config.dbDatabase,
  options: {
    encrypt: true, // // Si estás utilizando una conexión segura, asegúrate de habilitar la opción "encrypt"
    trustServerCertificate: true, // change to true for local dev / self-signed certs
    connectionTimeout: 30000, // Incrementa el tiempo de espera de conexión a 30 segundos
    requestTimeout: 30000 //
  },
  pool:{
    max: 10,
    min:0,
    idleTimeoutMillis: 30000,
    //connectionTimeout: 30000, // Incrementa el tiempo de espera de conexión
    //requestTimeout: 30000 // Incrementa el tiempo de espera de las solicitudes
  }
}


/* export const poolDb = new ConnectionPool(dbsettings)

poolDb.on('error', (err) => {
  console.error('Error en la conexión de la base de datos: ', err)
}) */

let poolPC

const connectPoolPC = async () => {
  try {
    poolPC = await new sql.ConnectionPool(dbsettings).connect()
    console.log('Conexión establecida correctamente PC');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    setTimeout(connectPoolPC, 5000); // Reintentar la conexión después de 5 segundos
  }
}


/*export const poolPC = new ConnectionPool(dbsettings)

 export async function connectPoolPC() {
  try {
    await poolPC.connect()
    console.log('Conexión establecida correctamente PC');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

export async function createPool() {
  try {
    const pool = new ConnectionPool(dbsettings)
    await pool.connect()
    return pool
  } catch (error) {
    console.error(error);
  }
  
}


export async function getConnection() {
  try {
    const pool = await sql.connect(dbsettings)
    return pool  
  } catch (error) {
    console.error(error);
  }
  
} */

  export {poolPC, sql, connectPoolPC}



















/*import { Connection } from "tedious";
import { Request } from "tedious";


// Create connection to database
const config = {
    server: 'localhost', //WSML103136\SQLEXPRESS
    authentication: {
        type: 'default',
        options: {
            userName: 'foc', // update me feloc
            password: 'Foc2486' // update me
        }
    },
    options: {
        database: 'he',
        trustServerCertificate: true //**AGREGADO
    }
  }
  
export function getConnectionSql(){
  const pool = new Connection(config);
  return pool
  //connectSql.connect()
} 


  connectSql.on('connect', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected SQL SERVER HE');
    }
  });
  
connectSql.connect()*/

 