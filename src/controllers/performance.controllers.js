import { poolPC } from "../database/connection.js";
import { queries } from "../database/queries.js";
import rpa_bot, {chat_id} from "../telegram/bot.js";

export const getPerformanceData = async (req, res) => {
    try {
        const pool = await poolPC;
        const result = await pool.request().query(queries.getPerformanceData);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de rendimiento:', error);
        res.status(500).send('Error al obtener los datos de rendimiento');
    }
};

export const getEquipmentData = async (req, res) => {
    try {
        const pool = await poolPC; 
        const result = await pool.request().query(queries.getEquipmentData);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de los equipos:', error);
        res.status(500).send('Error al obtener los datos de los equipos');
    }
};

export const getFilteredPerformanceData = async (req, res) => {
    const { startDate, endDate } = req.query;
    console.log(startDate, endDate);
    
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getFilteredPerformanceData);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de rendimiento filtrados:', error);
        res.status(500).send('Error al obtener los datos de rendimiento filtrados');
    }
}; 

export const getFilteredEquipmentData = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getFilteredEquipmentData);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de los equipos filtrados:', error);
        res.status(500).send('Error al obtener los datos de los equipos filtrados');
    }
};

export const getEquipmentDataByClass = async (req, res) => {
    try {
        const pool = await poolPC;
        const result = await pool.request().query(queries.getEquipmentDataByClass);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de los equipos por clase:', error);
        res.status(500).send('Error al obtener los datos de los equipos por clase');
    }
};

export const getFilteredEquipmentDataByClass = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getFilteredEquipmentDataByClass);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los datos de los equipos por clase filtrados:', error);
        res.status(500).send('Error al obtener los datos de los equipos por clase filtrados');
    }
};

export const renderPerformancePage = (req, res) => { 
    res.render('performance');
};

async function prueba() {
    rpa_bot.telegram.sendMessage(chat_id, 'prueba')   
}

// Ejemplo de uso de la función de envío de mensajes 
/* app.post('/sendTelegramMessage', async (req, res) => { 
    const { message } = req.body; 
    try { await sendMessageToChat(message); 
        res.status(200).send('Mensaje enviado correctamente'); 
    } catch (error) { 
        res.status(500).send('Error al enviar el mensaje'); 
    }
}); */

//prueba()
