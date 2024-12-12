import { Telegraf } from "telegraf";
import config from "../config.js";

const token = config.token

const rpa_bot = new Telegraf(token)

export const chat_id = '-4780034676'//chat Mtto_LD


/* rpa_bot.on('text', (ctx) => { 
    const chatId = ctx.chat.id; 
    const message = ctx.message.text; 
    // Envía un mensaje de respuesta 
    ctx.reply(`Recibí tu mensaje: ${message}`);
});  */

// Escucha el comando /stats 
rpa_bot.command('stats', async (ctx) => { 
    const chatId = ctx.chat.id; 
    try { 
        const response = await fetch(`${config.baseUrl}/performance/data`); 
        const data = await response.json(); 
        let statsMessage = 'Estadísticas de Técnicos:\n\n'; 
        data.forEach(item => { 
            statsMessage += `Técnico: ${item.technician}\n`; 
            statsMessage += `Número de Avisos: ${item.numNotices}\n`; 
            statsMessage += `Tiempo Total (minutos): ${item.totalTime}\n\n`; 
        }); 
        
        // Envía el mensaje de estadísticas al chat 
        await ctx.reply(statsMessage); 
    } catch (error) { 
        // Envía un mensaje de error al chat 
        await ctx.reply('Error al obtener las estadísticas.'); 
        console.error('Error al obtener las estadísticas de rendimiento:', error); 
    } 
});


// Inicia el bot 
rpa_bot.launch() 
    .then(() => console.log('Bot de Telegram iniciado')) 
    .catch(error => console.error('Error al iniciar el bot:', error));



//rpa_bot.launch()

// Función para enviar un mensaje al chat específico 
export const sendMessageToChat = async (message) => { 
    try { await rpa_bot.telegram.sendMessage(chat_id, message); 
        console.log(`Mensaje enviado al chat ${chat_id}: ${message}`); 
    } catch (error) { 
        console.error('Error al enviar el mensaje:', error); 
    }
};

export default rpa_bot 