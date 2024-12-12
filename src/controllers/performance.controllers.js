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