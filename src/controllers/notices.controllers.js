import axios from "axios";
import { sql, poolPC } from "../database/connection.js";
import {queries} from "../database/queries.js"
import sharp from 'sharp';
import path from "path";
import { validationResult, query } from "express-validator";
import { format, parseISO, addDays } from "date-fns";
import { getUserByPassword } from "../services/userService.js";//solo si se utiliza el servicio de validacion  
import { sendMessageToChat } from "../telegram/bot.js";
import { io } from '../app.js';

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//const poolPromise = createPool()


export const index = (req, res)=>{
    res.render('index',{title : "RPA"})
}

export const renderRegisterNoticePage = async (req, res) => {
    try {
        console.log('Usuario autenticado:', req.user); // Verifica si req.user contiene la información del usuario

        const pool = await poolPC;
        const result = await pool.request().query(queries.getEquipment);
        const data = result.recordset;

        res.render('registerNotice', { data, user: req.user }); // Asegúrate de enviar req.user a la vista
    } catch (error) {
        console.error('Error al obtener la lista de equipos:', error);
        res.status(500).send('Error al obtener la lista de equipos');
    }
};



//User
export const getUsers = async (req, res) => {
    try {
        const result = await poolPC
        .request()
        .query(queries.getUsers)

        return res.json({
            users: result
        })

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
}

export const updateUsers = async (req, res) => {
    try {
        const {id} = req.body
        await poolPC
        .request()
        .input('status', sql.VarChar, 'active')
        .query(queries.updateUsers)

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
}



//Notices

export const getNotices = async (req, res) => {
    try {
        const result = await poolPC
        .request()
        .query(queries.getNotices)

        return res.json(
            result.recordset
        )

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
}

// Obtener avisos por categoría
export const getNoticesByCategory = async (req, res) => {
    const { location } = req.params;
    console.log('location mia', location);
    
    try {
        const pool = await poolPC;
        const result = await pool.request()
            .input('location', location)
            .query(queries.getNoticesByCategory);
        res.json(result.recordset);
    } catch (error) {
        console.error(`Error al obtener los avisos de la categoría ${location}:`, error);
        res.status(500).send(`Error al obtener los avisos de la categoría ${location}`);
    }
};


export const getNoticeById = async (req, res) => {
    try {
        const result = await poolPC
        .request()
        .input('id',sql.Int, id)
        .query(queries.getNoticeById)

        return res.json(
            result.recordset
        )

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
}


// Obtener avisos no aceptados
export const getUnAcceptedNotices = async (req, res) => {
    try {
        const pool = await poolPC;
        const result = await pool.request().query(queries.getUnAcceptedNotices);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los avisos no aceptados:', error);
        res.status(500).send('Error al obtener los avisos no aceptados');
    }
};

// Obtener avisos aceptados
export const getAcceptedNotices = async (req, res) => {
    try {
        const pool = await poolPC;
        const result = await pool.request().query(queries.getAcceptedNotices);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error al obtener los avisos aceptados:', error);
        res.status(500).send('Error al obtener los avisos aceptados');
    }
};





export const notices = async (req, res) => {

    try {
        const pool = await poolPC
        const result = await pool
        .request()
        .query(queries.getEquipment)

        const result1 = await pool
        .request()
        .query(queries.getNotices)
        const keys = Object.keys(result1.recordset.columns)

        const unAcceptedNotices = result1.recordset.filter(item => (item.status == 1))

        res.render('notices', {data: result.recordset, unAcceptedNotices, keys})

    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        res.status(500).send('Error al obtener las notificaciones');        
    } 
}

export const createNotice = async (req, res) => {

    try {
        const {equipment, event, notice_desc, pass, location} = req.body
        console.log(pass);

        // Validar la contraseña
        const user = await getUserByPassword(pass)
        console.log(user);
        if (!user) {
            return res.render('error', { error: 'Invalid password.' })      
        }

        const status = 1
        const regtime = new Date()
        console.log(equipment, event, notice_desc, regtime);

        await poolPC
        .request()
        .input('status', sql.Int, status)
        .input('machine', sql.VarChar, equipment)
        .input('message', sql.VarChar, event)
        .input('detail', sql.Text, notice_desc)
        .input('regtime', sql.DateTime, regtime)
        .input('requester', sql.Int, user.id)
        .input('location', sql.VarChar, location)
        .query(queries.createNotice)

        // Emitir evento de Socket.io 
        io.emit('newNotice', { equipment, event, notice_desc });

        // Enviar mensaje a Telegram
        const message = `Nuevo aviso registrado:\nEquipo: ${equipment}\nNovedad: ${event}\nDescripción: ${notice_desc}`; 
        await sendMessageToChat(message);

        res.redirect('/viewNotices')

    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
    
}

export const updatePriority = async (req, res) => {
    const { id } = req.params;
    const { direction } = req.body;
    console.log(direction);
    

    try {
        // Obtener la prioridad actual
        const result = await poolPC
            .request()
            .input('id', sql.Int, id)
            .query(`SELECT priority FROM notices WHERE id = @id`);

        const currentPriority = result.recordset[0].priority || 0;

        // Incrementar o disminuir la prioridad
        const newPriority = direction === 'up' ? currentPriority + 1 : currentPriority - 1;

        // Actualizar la prioridad
        await poolPC
            .request()
            .input('id', sql.Int, id)
            .input('priority', sql.Int, newPriority)
            .query(`UPDATE notices SET priority = @priority WHERE id = @id`);

        res.status(200).json({ message: 'Prioridad actualizada.' });
    } catch (error) {
        console.error('Error al actualizar prioridad:', error);
        res.status(500).send('Error al actualizar prioridad.');
    }
};


//Consider using libraries like mssql/promise for a more streamlined asynchronous handling of database queries.
//Prepared Statements (Optional):
//Consider using prepared statements for both the SELECT and UPDATE queries to enhance security and prevent SQL injection vulnerabilities.

export const acceptNotice = async (req, res) => {
    const {pass} = req.body
    const {id_notice} = req.params
    console.log(id_notice);
    const notice_status = 2
    const starttime = new Date()
    console.log(pass.length); 
    try {

        if (pass.length != 4) {
            return res.render('error', { error: 'Password must be 4 characters long.' });
        }

        const users = await poolPC
            .request()
            .query(queries.getUsers)


        let matchingUser = null
        
        for (const user of users.recordset) {
            if (user.pass == pass) {
                matchingUser = user
                break
            }
        }

        // Handle no matching user
        if (!matchingUser) {
            return res.render('error', { error: 'Invalid password.' }); //return res.status(400).json({ error: 'Invalid password.' });
        }

        // Check user status
        if (matchingUser.status !== 'inactive') {
            return res.render('error', { error: 'Ya estas registrado en un Aviso' }); //return res.status(400).json({ error: 'User status must be inactive.' });
        }


        // await poolPC.transaction().begin()

        try {
            //update Notice
            await poolPC
                .request()
                .input('id', sql.Int, id_notice)
                .input('status', sql.Int, notice_status)
                .input('starttime', sql.DateTime, starttime)
                .input('technician', sql.VarChar, matchingUser.name + ' ' +  matchingUser.lastname)
                .query(queries.updateNotice)

            //update user status
            await poolPC
                .request()
                .input('id', sql.Int, matchingUser.id)
                .input('status',sql.VarChar, 'active')
                .query(queries.updateUsers)

            //insert NoticeUser
            await poolPC
            .request()
            .input('id_user', sql.Int, matchingUser.id)
            .input('id_notice', sql.Int, id_notice)
            .input('starttime', sql.DateTime, starttime)
            .query(queries.insertNoticeUser)

            /* axios.post('/putNoticeUser', {
                id_user: matchingUser.id,
                id_notice: id_notice,
                starttime: starttime
            }) */

            //await poolPC.transaction().commit()
            console.log('Aviso aceptado correctamente')
            res.redirect('/viewNotices')
        } catch (error) {
            //await poolPC.transaction().rollback(); // Rollback on error
            console.error('Error updating notice and user:', error);
            res.status(500).json({ error: 'Internal server error (notice/user update).' });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });

    }
}

export const closeNotice = async (req, res) => {
    const {description, class_, machineStopped} = req.body
    const {id_notice} = req.params
    const notice_status = 3 
    const endtime = new Date() 
    const machineStoppedValue = machineStopped === 'yes' ? 'yes' : 'no';
    console.log(description, id_notice, endtime);

    try {
         await poolPC
        .request()
        .input('id', sql.Int, id_notice)
        .input('status', sql.Int, notice_status)
        .input('endtime', sql.DateTime, endtime)
        .input('class', sql.VarChar, class_)
        .input('stopped',sql.VarChar, machineStoppedValue)
        //.input('description', sql.Text, description)
        .query(queries.updateNoticeClosed) 


        let result = await poolPC
        .request()
        .query(queries.getNoticeUserFilter)

        console.log('Result Recordset:', result.recordset);

        // Filtrar solo las entradas sin endtime
        const noticeUserFilter = result.recordset.filter(item => (item.id === parseInt(id_notice, 10) && item.endtime === null));
        console.log('id', id_notice);
        
        console.log('Filtered Result:', noticeUserFilter);
        
        // Obtener la última entrada sin endtime
        //const lastNoticeUser = noticeUserFilter[noticeUserFilter.length - 1];
        //console.log('Last Notice User:', lastNoticeUser);

        if (noticeUserFilter) {
            for (const item of noticeUserFilter) {
                await poolPC
                    .request()
                    .input('endtime', sql.DateTime, endtime)
                    .input('id_user', sql.Int, item.user_id)
                    .input('id', sql.Int, item.id_notices_user) // Usamos el ID específico de notices_user
                    .query(queries.updateNoticesUser);
    
                // Actualizar otros datos relacionados si es necesario
                await poolPC
                    .request()
                    .input('id', sql.Int, item.user_id)
                    .query(queries.updateUsersAll);
    
                console.log(`Updated notices_user ID: ${item.id_notices_user}, User ID: ${item.user_id}`);
            }
        }

        //const noticeUserFilter = result.recordset.filter(item => (item.id == id_notice && item.endtime === null))
        //const noticeUserFilterLast = [] = noticeUserFilter[noticeUserFilter.length-1]
        //const noticeUserFilter = [] = result.recordset.filter(item => (item.id == id_notice))
        //console.log(result.recordset);
        //console.log(noticeUserFilter.length);


        /* noticeUserFilter.map ( async item => {
            const endTime = new Date()
            console.log(item.user_id);
            console.log(item.id);
            await poolPC
            .request()
            .input('endtime', sql.DateTime, endTime)
            .input('id_user', sql.Int, item.user_id)
            .input('id_notice', sql.Int, item.id)
            .query(queries.updateNoticesUser)

        })

        noticeUserFilter.map(async item => {
            console.log('item id ' + item.user_id);
            await poolPC
            .request()
            .input('id', sql.Int, item.user_id)
            .query(queries.updateUsersAll)
        }) */

        res.redirect('/viewNotices')

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }


}

export const updateNotice = async(req, res)=>{
    try {
        const {description} = req.body
        const {id_notice} = req.params

        console.log(description);

        await poolPC
        .request()
        .input('id', sql.Int, id_notice)
        .input('description', sql.Text, description)
        .query(queries.updateNoticeDescription)

        res.redirect(`/noticesDetail/${id_notice}`)

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }

}


export const addUserNotice = async(req, res) => {
    const {pass} = req.body
    const {id_notice} = req.params
    const starttime = new Date()


    try {

        if (pass.length != 4) {
            return res.render('error', { error: 'Password must be 4 characters long.' });
        }


        const users = await poolPC
            .request()
            .query(queries.getUsers)


        let matchingUser = null
        
        for (const user of users.recordset) {
            if (user.pass == pass) {
                matchingUser = user
                break
            }
        }

        // Handle no matching user
        if (!matchingUser) {
            return res.render('error', { error: 'Invalid password.' }); //return res.status(400).json({ error: 'Invalid password.' });
        }

        // Check user status
        if (matchingUser.status !== 'inactive') {
            return res.render('error', { error: 'Ya estas registrado en un Aviso' }); //return res.status(400).json({ error: 'User status must be inactive.' });
        }


        try {
            //update user status
            await poolPC
            .request()
            .input('id', sql.Int, matchingUser.id)
            .input('status',sql.VarChar, 'active')
            .query(queries.updateUsers)

            //insert NoticeUser
            await poolPC
            .request()
            .input('id_user', sql.Int, matchingUser.id)
            .input('id_notice', sql.Int, id_notice)
            .input('starttime', sql.DateTime, starttime)
            .query(queries.insertNoticeUser)

            console.log('Usuario agregado correctamente')
            res.redirect('/viewNotices')
            } catch (error) {
                console.error('Error adding user to notice:', error);
                res.status(500).json({ error: 'Internal server error (addUser/notice update).' });
            }     

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export const exitUserNotice = async (req, res) => {
    const {id_notices_user, id_notice, user_id} = req.query//diferente
    const {description} = req.body
    const endtime = new Date()
    console.log(id_notice, id_notices_user, user_id);
    console.log(description);

    try {
        await poolPC
        .request()
        .input('id', sql.Int, id_notices_user)
        .input('id_user', sql.Int, user_id)
        .input('id_notice', sql.Int, id_notice)
        .input('endtime', sql.DateTime, endtime)
        .input('comment', sql.Text, description)
        .query(queries.exitUserNotice)
    
        //update user status
        await poolPC
        .request()
        .input('id', sql.Int, user_id)
        .input('status',sql.VarChar, 'inactive')
        .query(queries.updateUsers)
    
    
        res.redirect(`/noticesDetail/${id_notice}`) 
    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
    
}


export const noticesDetail = async (req, res) => {

    let {id_notice} = req.params
    //id_notice = parseInt(id_notice)
    console.log(id_notice);
    console.log(typeof id_notice);

    try {
        const result = await poolPC
        .request()
        .input('id',sql.Int, id_notice)
        .query(queries.getNoticeById)

        const result1 = await poolPC
        .request()
        .input('id', sql.Int, id_notice)
        .query(queries.getNoticeUserFilterById)

        console.log(result.recordset);
        console.log(result1.recordset);

        res.render('noticesDetail', {notice: result.recordset, noticeUserFId: result1.recordset})

    } catch (error) {
        console.error(error);
        res.status(500)
        res.send(error.message)
    }
}


// Validador para la búsqueda de historial de notificaciones
export const noticesHistory = [
    query('machine').optional().isString().trim().escape(),
    query('message').optional().isString().trim().escape(),
    query('technician').optional().isString().trim().escape(),
    query('startDate').optional({ checkFalsy: true }).isISO8601(),
    query('endDate').optional({ checkFalsy: true }).isISO8601(),

    async (req, res) => {
        // Manejo de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { machine, message, technician, startDate, endDate } = req.query;

        let query = queries.getNoticesHistory;
        const conditions = [];
        const params = {};

        if (machine) {
            conditions.push('machine LIKE @machine');
            params.machine = `%${machine}%`;
        }
        if (message) {
            conditions.push('message LIKE @message');
            params.message = `%${message}%`;
        }
        if (technician) {
            conditions.push('technician LIKE @technician');
            params.technician = `%${technician}%`;
        }
        if (startDate) {
            const parsedStartDate = parseISO(startDate);
            conditions.push('starttime >= @startDate');
            params.startDate = parsedStartDate;
        }
        if (endDate) {
            const parsedEndDate = addDays(parseISO(endDate), 1);
            conditions.push('endtime <= @endDate');
            params.endDate = parsedEndDate;
        }

        if (conditions.length > 0) {
            query += ' AND ' + conditions.join(' AND ');
        }

        try {
            const pool = await poolPC;
            const request = pool.request();

            Object.entries(params).forEach(([key, value]) => {
                request.input(key, value);
            });

            const result = await request.query(query += ' ORDER BY endtime desc');

            // Formatear fechas para el formulario
            const formattedStartDate = startDate ? format(parseISO(startDate), 'yyyy-MM-dd') : '';
            const formattedEndDate = endDate ? format(parseISO(endDate), 'yyyy-MM-dd') : '';

            res.render('noticesHistory', {
                noticesHistory: result.recordset,
                machine,
                message,
                technician,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            });
        } catch (error) {
            console.error('Error al obtener el historial de notificaciones:', error);
            res.status(500).send('Error al obtener el historial de notificaciones');
        }
    }
];


//REVIEW-----------------------
export const renderReviewPage = async (req, res) => {
    try {
        const result = await poolPC.request().query('SELECT * FROM notices WHERE status = 3');
        const data = result.recordset;
        res.render('review', { data });
    } catch (error) {
        console.error('Error al obtener avisos en revisión:', error);
        res.status(500).send('Error interno');
    }
};

export const acceptReviewNotice = async (req, res) => {
    const { id } = req.params;
    try {
        await poolPC.request()
            .input('id', id)
            .query('UPDATE notices SET status = 4 WHERE id = @id'); // Cambia a historial
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al aceptar aviso:', error);
        res.status(500).send('Error interno');
    }
};

export const rejectReviewNotice = async (req, res) => {
    const { id } = req.params;
    try {
        await poolPC.request()
            .input('id', id)
            .query('UPDATE notices SET status = 2 WHERE id = @id'); // Devuelve el aviso a estado 2
        res.sendStatus(200);
    } catch (error) {
        console.error('Error al rechazar aviso:', error);
        res.status(500).send('Error interno');
    }
};
 
/* export const noticesHistory = [

    //validacion
    query('machine').optional().isString().trim().escape(),
    query('technician').optional().isString().trim().escape(),
    query('startDate').optional({ checkFalsy: true }).isISO8601(),
    query('endDate').optional({ checkFalsy: true }).isISO8601(),

    async (req, res) => {
        // Manejo de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    

        let {machine, message, technician, startDate, endDate} = req.query

        let query = queries.getNoticesHistory
        let conditions = []
        let params = {}

        if (machine) {
            conditions.push('machine LIKE @machine');
            params.machine = `%${machine}%`;
        }
        if (message) {
            conditions.push('message LIKE @message');
            params.message = `%${message}%`;
        }
        if (technician) {
            conditions.push('technician LIKE @technician');
            params.technician = `%${technician}%`;
        }
        if (startDate) {
            startDate = parseISO(startDate)
            conditions.push('starttime >= @startDate');
            params.startDate = startDate;
        }
        if (endDate) {
            endDate = parseISO(endDate)
            endDate = addDays(endDate,1)
            conditions.push('endtime <= @endDate');
            params.endDate = endDate;
        }

        if (conditions.length > 0) {
            query += ' AND ' + conditions.join(' AND ');
            console.log(query);
        }

        console.log(conditions);
        console.log(params);


        try {
            const request = poolPC.request()

            for (const param in params) {
                request.input(param, params[param])
                console.log(param, params[param]);
            }

            const result = await request.query(query)

            // Formatear fechas para el formulario
            const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : '';
            const formattedEndDate = endDate ? format(new Date(endDate), 'yyyy-MM-dd') : '';

            res.render('noticesHistory', {
                noticesHistory:result.recordset,
                machine,
                message,
                technician,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            })

        } catch (error) {
            console.error(error);
            res.status(500)
            res.send(error.message)
        }
    }
] */


//NoticeUser-----------------------------------

export const putNoticeUser = async (req, res) => {
    const {id_user, id_notice, starttime} = req.body

    await poolPC.transaction().begin()
    try {
        await poolPC
        .request()
        .input('id_user', sql.Int, id_user)
        .input('id_notice', sql.Int, id_notice)
        .input('starttime', sql.DateTime, starttime)
        .query(queries.insertNoticeUser)

        await poolPC.transaction().commit()
        console.log('NoticeUser insertado correctamente');

    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}



export const noticesUser_User = async (req, res) => {
    const {id_notice} = req.params;

    console.log('el id notice es', id_notice);
    try {
        const result = await poolPC
        .request()
        .input('id_notice', sql.Int, id_notice)
        .query(queries.getNoticesUser_UserId)

        const noticesUser_User = result.recordset
        res.status(200).json(noticesUser_User)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error noticesUser_User' });
    }

}


    

//images--------------------------
export const uploadImages = async (req, res) => {
    /* const { filename, path: filePath } = req.file
    const resizedFilePath = `../uploads/resized_${filename}` */

    const { id_notice } = req.body; 


    const { buffer, originalname } = req.file
    const filename = Date.now() + path.extname(originalname)
    const resizedFilePath = path.join(__dirname, '../uploads', `resized_${filename}`);

    console.log(resizedFilePath);




     try {
        // Redimensionar la imagen
        /* await sharp(filePath)
          .resize(800, 600) // Ajusta el tamaño según tus necesidades
          .toFile(path.join(__dirname, resizedFilePath)); */

        await sharp(buffer)
          .resize(800, 600) // Ajusta el tamaño según tus necesidades
          .toFile(resizedFilePath);
    
        // Guarda la información de la imagen en la base de datos
        

        await poolPC 
            .request()
            .input('id_notice', sql.Int, id_notice)
            .input('imagename', sql.VarChar, filename)
            //.input('equipment', sql.VarChar, resizedFilePath)
            //.input('comment', sql.VarChar, resizedFilePath)
            .query(queries.uploadImages);
    
        console.log('Imagen subida y redimensionada exitosamente');
        res.redirect(`/noticesDetail/${id_notice}`)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir la imagen' });
      } 
}


export const getImages = async (req, res)=>{
    const {id_notice} = req.params
    try {
        const result = await poolPC
        .request()
        .input('id_notice', sql.Int, id_notice)
        .query(queries.getImages)
        const images = result.recordset
        res.status(200).json(images)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las imágenes' });
    }
}

/* Transaction-Based Updates:
Wrap the notice and user status updates within a transaction using poolPC.transaction().
This ensures that both updates happen atomically or not at all, maintaining data integrity in case of partial failures.
Use await poolPC.transaction().commit() to finalize successful updates and await poolPC.transaction().rollback() to revert changes in case of errors. */


/* export const acceptNotice = async (req, res) => {
    const {pass} = req.body
    const {id} = req.params
    const status = 2
    const starttime = new Date()
    console.log(pass.length); 
    try {
        console.log('prueba');
        const result = await poolPC
            .request()
            .query(queries.getUsers)


            console.log(result.recordset);
        let resultado = result.recordset

        resultado.forEach (element => {
            console.log(typeof(element.pass));
            console.log(typeof(pass));

            //if (pass.length===)
            if (element.pass == pass) {
                console.log('coincide');
                if (element.status != 'active') {
                    poolPC
                    .request()
                    .input('id', sql.Int, id)
                    .input('status', sql.Int, status)
                    .input('starttime', sql.DateTime, starttime)
                    .input('technician', sql.VarChar, element.name + ' ' +  element.lastname)
                    .query(queries.updateNotice)
    
                    poolPC
                    .request()
                    .input('id', sql.Int, element.id)
                    .input('status',sql.VarChar, 'active')
                    .query(queries.updateUsers) 
                }else{
                    
                }
                
            }else{
                console.log('nop');
            }
        });
        console.log('Aviso aceptado correctamente');        
        res.redirect('/notices')


    } catch (error) {
        console.error(error)
        res.status(500).send('Error interno del servidor')

    }


} */