import sql from "mssql";
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
    idleTimeoutMillis: 30000,// Tiempo de espera inactivo de 30 segundos
  }
}

let poolPC; 
let retryCount = 0;
const maxRetries = 5; // Número máximo de reintentos 

const handleDatabaseConnectionError = (error) => { 
  console.error('Error al conectar a la base de datos:', error); 
  if (retryCount < maxRetries) { 
    retryCount++; 
    console.log(`Reintentando conexión... Intento ${retryCount} de ${maxRetries}`); 
    setTimeout(connectPoolPC, 5000); // Reintentar la conexión después de 5 segundos 
    } else { 
      console.error('Se alcanzó el número máximo de intentos de conexión'); 
    }
};

const connectPoolPC = async () => {
  try {
    poolPC = await new sql.ConnectionPool(dbsettings).connect()
    console.log('Conexión establecida correctamente PC');
  } catch (error) {
    handleDatabaseConnectionError(error)
  }
}

export {poolPC, sql, connectPoolPC}