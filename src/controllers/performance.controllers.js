import { poolPC } from "../database/connection.js";
import { queries } from "../database/queries.js";
import rpa_bot, {chat_id} from "../telegram/bot.js";
import { calculateTotalOperationTime } from "../utils/timeUtils.js"; 


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
    console.log( 'fechas filtro' + startDate, endDate);
    
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

//--------------------------------------------

export const getMTBFData = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getMTBFData);
        const totalOperationTime = calculateTotalOperationTime(); // Calcular el tiempo total de operación
        const mtbfData = result.recordset.map(item => ({
            equipment: item.equipment,
            mtbf: totalOperationTime / item.numFailures
        }));
        res.json(mtbfData);
    } catch (error) {
        console.error('Error al obtener MTBF:', error);
        res.status(500).send('Error al obtener MTBF');
    }
};

export const getMTTRData = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getMTTRData);
        const mttrData = result.recordset.map(item => ({
            equipment: item.equipment,
            mttr: item.totalRepairTime / item.numFailures
        }));
        res.json(mttrData);
    } catch (error) {
        console.error('Error al obtener MTTR:', error);
        res.status(500).send('Error al obtener MTTR');
    }
};

export const getAvailabilityData = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const pool = await poolPC;
        const request = pool.request();
        request.input('startDate', startDate);
        request.input('endDate', endDate);
        const result = await request.query(queries.getAvailabilityData);
        const totalOperationTime = calculateTotalOperationTime(); // Calcular el tiempo total de operación
        const availabilityData = result.recordset.map(item => ({
            equipment: item.equipment,
            availability: totalOperationTime / (totalOperationTime + item.totalRepairTime)
        }));
        res.json(availabilityData);
    } catch (error) {
        console.error('Error al obtener disponibilidad:', error);
        res.status(500).send('Error al obtener disponibilidad');
    }
};

//-------------------
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
