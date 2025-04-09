import { queries } from "../database/queries.js";
import { sql, poolPC } from "../database/connection.js";
import config from "../config.js";
import cron from 'node-cron';
import axios from "axios";


const token = config.token
const chat_id = config.chat_id


export const registerAlert = async (req, res) => {
    const { name, startDate, startTime, period, hours, message } = req.body;

    try {
        const formattedStartTime = `${startTime}:00`; // Asegura el formato HH:mm:ss

        const result = await poolPC
            .request()
            .input('name', sql.VarChar, name)
            .input('startDate', sql.Date, startDate)
            .input('startTime', sql.VarChar, formattedStartTime) // Mantén como texto para evitar errores
            .input('period', sql.VarChar, period)
            .input('hours', sql.Int, hours || null)
            .input('message', sql.Text, message)
            .query(queries.createAlert);

        res.redirect('/viewAlerts');
    } catch (error) {
        console.error('Error al registrar alerta:', error);
        res.status(500).json({ message: 'Error interno al registrar alerta.' });
    }
};



export const getAlerts = async (req, res) => {
    try {
        const result = await poolPC.request().query(queries.getAlerts);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener alertas:', error);
        res.status(500).json({ message: 'Error interno al obtener alertas.' });
    }
};


export const deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        await poolPC.request().query(`DELETE FROM alerts WHERE id = ${id}`);
        res.status(200).json({ message: 'Alerta eliminada correctamente.' });
    } catch (error) {
        console.error('Error al eliminar alerta:', error);
        res.status(500).json({ message: 'Error interno al eliminar alerta.' });
    }
};

// Función para combinar fecha y hora
function combineDateAndTime(date, time) {
    // Convertir startDate a cadena si es un objeto Date
    if (date instanceof Date) {
        date = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }

    // Convertir startTime a cadena si es un objeto Date
    if (time instanceof Date) {
        time = time.toTimeString().split(' ')[0]; // Formato HH:mm:ss
    }

    // Validar los formatos
    if (typeof date !== 'string' || !date.includes('-')) {
        throw new Error(`El valor de 'startDate' no es válido: ${date}`);
    }
    if (typeof time !== 'string' || !time.includes(':')) {
        throw new Error(`El valor de 'startTime' no es válido: ${time}`);
    }

    const [year, month, day] = date.split('-'); // Divide la fecha (YYYY-MM-DD)
    const [hours, minutes, seconds] = time.split(':'); // Divide la hora (HH:mm:ss)

    return new Date(
        parseInt(year),            // Año
        parseInt(month) - 1,       // Mes (0-indexado en JavaScript)
        parseInt(day),             // Día
        parseInt(hours),           // Hora
        parseInt(minutes),         // Minutos
        parseInt(seconds) || 0     // Segundos (opcional, por defecto 0)
    );
}

cron.schedule('* * * * *', async () => { // Ejecutar cada minuto
    const now = new Date();
    console.log('Cron ejecutado en:', now);

    // Obtener las alertas desde la base de datos
    const alerts = await poolPC.request().query('SELECT * FROM alerts');
    console.log('Alertas obtenidas:', alerts.recordset);

    alerts.recordset.forEach(async (alert) => {
        console.log('Start Date:', alert.startDate);
        console.log('Start Time:', alert.startTime);
        console.log('Last Triggered:', alert.lastTriggered);

        let hour = alert.startTime.getHours()
        console.log(hour);
        
        hour = hour + 5
        alert.startTime.setHours(hour)

        let formattedStartDate;
        let formattedStartTime;

        // Manejar startDate como objeto o cadena
        if (alert.startDate instanceof Date) {
            formattedStartDate = alert.startDate.toISOString().split('T')[0];
        } else {
            formattedStartDate = alert.startDate;
        }

        // Manejar startTime como objeto o cadena
        if (alert.startTime instanceof Date) {
            formattedStartTime = alert.startTime.toTimeString().split(' ')[0];
        } else {
            formattedStartTime = alert.startTime;
        }

        // Combinar startDate y startTime
        const alertDateTime = combineDateAndTime(formattedStartDate, formattedStartTime);
        console.log('Fecha y hora combinadas:', alertDateTime);

        if (isNaN(alertDateTime.getTime())) {
            console.error('Fecha y hora inválidas:', { date: alert.startDate, time: alert.startTime });
            return;
        }

        // Si la alerta ya se disparó, calcula el próximo disparo

        if (alert.lastTriggered) {
            let lastTriggeredHour = alert.lastTriggered.getHours()
            lastTriggeredHour = lastTriggeredHour + 5
            alert.lastTriggered.setHours(lastTriggeredHour)
        }
        
        const lastTriggered = alert.lastTriggered ? new Date(alert.lastTriggered) : null;
        let nextTriggerTime = alertDateTime;

        if (lastTriggered) {
            switch (alert.period) {
                case 'daily':
                    nextTriggerTime.setDate(lastTriggered.getDate() + 1);
                    break;
                case 'weekly':
                    nextTriggerTime.setDate(lastTriggered.getDate() + 7);
                    break;
                case 'monthly':
                    nextTriggerTime.setMonth(lastTriggered.getMonth() + 1);
                    break;
                case 'hours':
                    nextTriggerTime = new Date(lastTriggered.getTime() + (alert.hours * 60 * 60 * 1000));
                    break;
                default:
                    break;
            }
        }

        console.log('Próximo disparo calculado:', nextTriggerTime);

        // Evaluar si la alerta debe dispararse
        const shouldTrigger = now >= nextTriggerTime;

        if (shouldTrigger) {
            console.log('Alerta activada:', alert);

            // Enviar notificaciones
            await sendTelegramMessage(alert.message);
            //showBrowserNotification(alert.message);

            // Actualizar la última vez que se disparó
            await poolPC.request()
                .query(`UPDATE alerts SET lastTriggered = GETDATE() WHERE id = ${alert.id}`);
        }
    });
});

/* cron.schedule('* * * * *', async () => { // Ejecutar cada minuto
    const now = new Date();
    console.log('Cron ejecutado en:', now);

    // Obtener las alertas desde la base de datos
    const alerts = await poolPC.request().query('SELECT * FROM alerts');
    //console.log('Alertas obtenidas:', alerts.recordset);

    alerts.recordset.forEach(async (alert) => {
       // console.log('Start Date (raw):', alert.startDate);
        console.log('Start Time (raw):', alert.startTime);
        let hour = alert.startTime.getHours()
        console.log(hour);
        
        hour = hour + 5
        alert.startTime.setHours(hour)
        //alert.startTime = new Date(alert.startTime)
        //alert.startTime = alert.startTime  + 18000000
        //alert.startTime = new Date(alert.startTime) 
        console.log('mili', alert.startTime);
        
        let formattedStartDate;
        let formattedStartTime;

        // Manejar startDate como objeto o cadena
        if (alert.startDate instanceof Date) {
            formattedStartDate = alert.startDate.toISOString().split('T')[0]; // Convierte a YYYY-MM-DD
        } else {
            formattedStartDate = alert.startDate; // Si ya es cadena, úsala directamente
        }

        // Manejar startTime como objeto o cadena
        if (alert.startTime instanceof Date) {
            formattedStartTime = alert.startTime.toTimeString().split(' ')[0]; // Convierte a HH:mm:ss
        } else {
            formattedStartTime = alert.startTime; // Si ya es cadena, úsala directamente
        }
        console.log('formateada', formattedStartTime);
        
        //console.log('Start Date (formateado):', formattedStartDate);
        //console.log('Start Time (formateado):', formattedStartTime);

        // Combinar fecha y hora
        const alertDateTime = combineDateAndTime(formattedStartDate, formattedStartTime);

        console.log('Fecha y hora combinadas:', alertDateTime);

        if (isNaN(alertDateTime.getTime())) {
            console.error('Error: Fecha y hora combinadas inválidas:', { date: alert.startDate, time: alert.startTime });
            return;
        }

        // Calcular horas transcurridas desde alertDateTime
        const elapsedHours = Math.abs(now - alertDateTime) / (1000 * 60 * 60);
        console.log('elapsed', elapsedHours);
        console.log(alert.period);
        

        let shouldTrigger = false;

        // Evaluar según el periodo configurado
        switch (alert.period) {
            case 'daily':
                shouldTrigger = now.getHours() === alertDateTime.getHours() &&
                                now.getMinutes() === alertDateTime.getMinutes();
                break;
            case 'weekly':
                shouldTrigger = now.getDay() === alertDateTime.getDay() &&
                                now.getHours() === alertDateTime.getHours() &&
                                now.getMinutes() === alertDateTime.getMinutes();
                break;
            case 'monthly':
                shouldTrigger = now.getDate() === alertDateTime.getDate() &&
                                now.getHours() === alertDateTime.getHours() &&
                                now.getMinutes() === alertDateTime.getMinutes();
                break;
            case 'hours':
                shouldTrigger = elapsedHours >= alert.hours;
                break;
        }

        if (shouldTrigger) {
            console.log('Alerta activada:', alert);
            await sendTelegramMessage(alert.message); // Enviar mensaje por Telegram
            //showBrowserNotification(alert.message); // Mostrar notificación en el navegador
        }
    });
}); */

// Función para enviar mensaje por Telegram
async function sendTelegramMessage(message) {
    try {
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
            chat_id: chat_id,
            text: message,
        });
    } catch (error) {
        console.error('Error al enviar mensaje por Telegram:', error);
    }
}

// Función para mostrar notificaciones en el navegador
function showBrowserNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification('Alerta SST', { body: message });
    }
}