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

// Escucha mensajes de texto y responde a "list"
rpa_bot.command('list', async (ctx) => {
    const chatId = ctx.chat.id;
    //const message = ctx.message.text.toLowerCase();

    // Verifica si el mensaje incluye la palabra "list"
    //if (message.includes('list')) {
        try {
            // Obtener el listado de avisos sin aceptar desde el servidor o base de datos
            const response = await fetch(`${config.baseUrl}/unAcceptedNotices`);
            const data = await response.json();

            // Construir el mensaje de respuesta
            let listMessage = 'Listado de Avisos sin Aceptar:\n\n';
            data.forEach(item => {
                listMessage += `ID: ${item.id}\n`;
                listMessage += `Máquina: ${item.machine}\n`;
                listMessage += `Novedad: ${item.message}\n\n`;
            });

            // Envía el listado al chat
            await ctx.reply(listMessage);
        } catch (error) {
            // Manejo de errores
            await ctx.reply('Hubo un error al obtener el listado de avisos.');
            console.error('Error al obtener el listado de avisos:', error);
        }
    //}
});



rpa_bot.command('accept', async (ctx) => {
    const chatId = ctx.chat.id;
    const message = ctx.message.text;

    // Extraer el ID del aviso y la contraseña del mensaje
    const args = message.split(' ');
    if (args.length < 3 || isNaN(args[1])) {
        return ctx.reply('Uso correcto: /accept <id_aviso> <contraseña>. Ejemplo: /accept 1234 5678');
    }

    const id_notice = parseInt(args[1], 10);
    const pass = args[2];
    console.log(pass);
    

    try {
        // Validar que la contraseña tenga 4 caracteres
        if (pass.length !== 4) {
            return ctx.reply('La contraseña debe tener exactamente 4 caracteres.');
        }

        // Obtener la lista de usuarios para validar la contraseña
        const usersResponse = await fetch(`${config.baseUrl}/getUsers`);
        const {users} = await usersResponse.json();
        console.log(users);
        

        // Buscar al usuario correspondiente a la contraseña
        const usersArray = users.recordset
        const matchingUser = usersArray.find(user => user.pass === parseInt(pass, 10));

        if (!matchingUser) {
            return ctx.reply('Contraseña inválida.');
        }

        // Verificar el estado del usuario
        if (matchingUser.status !== 'inactive') {
            return ctx.reply('Este usuario ya está registrado en un aviso activo.');
        }

        // Realizar las actualizaciones correspondientes para aceptar el aviso
        const starttime = new Date();
        await fetch(`${config.baseUrl}/acceptNotice/${id_notice}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pass: pass,
                notice_status : 2,
                technician: `${matchingUser.name} ${matchingUser.lastname}`,
                id_user: matchingUser.id,
                starttime
            })
        });

        // Respuesta de confirmación
        ctx.reply(`Aviso con ID ${id_notice} aceptado correctamente por el técnico ${matchingUser.name} ${matchingUser.lastname}.`);
    } catch (error) {
        // Manejo de errores
        console.error('Error al aceptar el aviso:', error);
        ctx.reply('Hubo un error al aceptar el aviso. Por favor, inténtalo de nuevo.');
    }
});


rpa_bot.command('close', async (ctx) => {
    const chatId = ctx.chat.id;
    const message = ctx.message.text;

    // Extraer el ID del aviso y otros parámetros del mensaje
    const args = message.split(' ');
    if (args.length < 3) {
        return ctx.reply('Uso correcto: /close <id_aviso> <clase> <máquina_detenida>. Ejemplo: /close 1234 PM01 yes');
    }

    const id_notice = parseInt(args[1], 10);
    const class_ = args[2];
    const machineStopped = args[3]?.toLowerCase() === 'yes' ? 'yes' : 'no';
    //const description = 'Cerrado vía Telegram';

    try {
        // Enviar solicitud al backend para cerrar el aviso
        const response = await fetch(`${config.baseUrl}/closeNotice/${id_notice}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                class_,
                machineStopped
            })
        });

        if (response.ok) {
            ctx.reply(`El aviso con ID ${id_notice} se cerró correctamente.`);
        } else {
            const errorData = await response.json();
            ctx.reply(`Error al cerrar el aviso con ID ${id_notice}: ${errorData.message}`);
        }
    } catch (error) {
        ctx.reply('Hubo un error al cerrar el aviso. Por favor, inténtalo de nuevo.');
        console.error('Error al cerrar el aviso:', error);
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