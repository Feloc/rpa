import { json } from "express";
import { sql } from "../database/connection.js";
import {queries} from "../database/queries.js"
import clientMqtt from "../mqtt/connection.mqtt.js";
//import { ser } from "socket.io";
import { MyMax, MyMin } from "../index.js";
//import bot_pmp, { chat_id } from "../telegram/bot.js";

//const poolPromise = createPool()

/*io.on('message', (message)=>{
        //res.render('deviceTemp', {temp: message})//se pasa el archivo sin extension ejs
    })*/

/*io.on('message', (message) => {
    console.log(message);
})*/

export const getTemperature = async (req, res) => {
    console.log('mqtt');

    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getTempTurbine)
        
        let keys = Object.keys(result.recordset.columns)
        /*result.recordset.forEach((data) => {
            keys.forEach(key => {
                console.log(data[key]);
                const values = data[key]
            })

        });*/
        //res.json(result.recordset)
        res.render('deviceTemp', {data: result.recordset, data1: keys})//se pasa el archivo sin extension ejs

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    


}

export const getTemperatureChart = async (req, res) => {

    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getTempTurbine)
        
        let keys = Object.keys(result.recordset.columns)
        
        return res.json(result.recordset)
        //res.render('deviceTemp', {data: result.recordset, data1: keys})//se pasa el archivo sin extension ejs

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

export const temperatureChart = (req, res) => {
    res.render('deviceTempDb')
    //res.send('holita')
} 

//INSERCION EN LA BASE DE DATOS 

/*clientMqtt.on('message', async (topic, message) => {
    message = message.toString()

    if (topic === 'he/corte2/hx3/t_turbina') {

        console.log('Insertando Temp a la base de datos')
        console.log(message)


        try {
            const pool = await getConnection()
            
            await pool
            .request()
            .input('temp', sql.VarChar, message)
            //.input('startTime', sql.DateTime, new Date())
            //.input('endTime', sql.DateTime, new Date())
            .input('time', sql.DateTime, new Date())
            .query(queries.insertTempTurbine)
        } catch (error) {
            console.log(error);
            //res.status(500)
            //res.send(error.message)
        }
    }

    if (topic === 'he/corte3/hx6/v_turbina') {
        console.log('Insertando Acc a la base de datos')
        message = JSON.parse(message)

        let acc_x = message.ACC_X
        let acc_y = message.ACC_Y
        let acc_z = message.ACC_Z
        let gyr_x  = message.GYR_X
        let gyr_y = message.GYR_Y
        let gyr_z = message.GYR_Z

        try {
            const pool = await getConnection()
            await pool
            .request()
            .input('acc_x', sql.Float, acc_x)
            .input('acc_y', sql.Float, acc_y)
            .input('acc_z', sql.Float, acc_z)
            .input('gyr_x', sql.Float, gyr_x)
            .input('gyr_y', sql.Float, gyr_y)
            .input('gyr_z', sql.Float, gyr_z)
            .input('time', sql.DateTime, new Date())
            .query(queries.insertAccTurbine)
        } catch (error) {
            console.log(error)
            //res.status(500)
            //res.send(error.message)
        }
    }
    

})
*/





//INSERTAR ACELERACION HEAD

let acc_x_array = []
let acc_y_array = []
let acc_z_array = []

let AcyCount = 0

clientMqtt.on('message', async (topic, message) => {
    //try {
        message = message.toString()
        //console.log(message);
        try {
            message = JSON.parse(message, (key, value) => {
                //console.log(typeof value);
                //value.toString()
                if(typeof value === 'string'){
                    console.log('cambiado');
                    return value.replace(/[^0-9.]/g, '')
                }
                return value
            })
        } catch (error) {
            console.error('Error al analizar la cadena JSON:', error.message)
            console.error('Cadena JSON problemática:', message)
        }

        if (topic === 'he/corte2/hx5/v_head') {
            //console.log('Insertando Acc_Head a la base de datos')
    
            let acc_x = message.ACC_X
            acc_x_array.push(acc_x)
            let acc_y = message.ACC_Y
            acc_y_array.push(acc_y)
            let acc_z = message.ACC_Z//parseFloat(message.ACC_Z.toString().replace(/[^0-9.]/g, '')).toFixed(3);
            acc_z_array.push(acc_z)

            //console.log(acc_x, acc_y, acc_z);
            let gyr_x  = message.GYR_X
            let gyr_y = message.GYR_Y
            let gyr_z = message.GYR_Z
            

            try {
                if (acc_y >= 15 /* && (acc_y - 15) % 5 <= 2 */) {
                    AcyCount++
                    console.log(AcyCount);
                    if (AcyCount === 1 ) {
                        await bot_pmp.telegram.sendMessage(chat_id, 'AcY  ' + acc_y) 
                        console.log('AcY ', acc_y);                                      
                    }
                }
                if (acc_y < 15) {
                    AcyCount = 0
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
            
        
            
        }



    /* if (acc_x_array.length === 1000) {
        let acc_x_max = MyMax(acc_x_array);
        let acc_x_min = MyMin(acc_x_array);
        let acc_y_max = MyMax(acc_y_array)
        let acc_y_min = MyMin(acc_y_array)
        let acc_z_max = MyMax(acc_z_array)
        let acc_z_min = MyMin(acc_z_array)
        console.log('X max', MyMax(acc_x_array));
        console.log('X min', MyMin(acc_x_array));
        console.log('Y max', MyMax(acc_y_array));
        console.log('Y min', MyMin(acc_y_array));
        console.log('Z max', MyMax(acc_z_array));
        console.log('Z min', MyMin(acc_z_array));

        try{
            const pool = await getConnection()
            if (pool) {
                await pool
                .request()
                .input('acc_x', sql.Float, acc_x_max)
                .input('acc_y', sql.Float, acc_y_max)
                .input('acc_z', sql.Float, acc_z_max)
                .input('time', sql.DateTime, new Date())
                .query(queries.insertAccHeadHX3)
                await pool
                .request()
                .input('acc_x', sql.Float, acc_x_min)
                .input('acc_y', sql.Float, acc_y_min)
                .input('acc_z', sql.Float, acc_z_min)
                .input('time', sql.DateTime, new Date())
                .query(queries.insertAccHeadHX3)

            } else {
                console.log('no connection');
            }
            
        }catch(error){
            console.log(error);
        } 

        acc_x_array = [] 
        acc_y_array = [] 
        acc_z_array = [] 
    } */

    if (acc_x_array.length === 1000) {
        let acc_x_max = MyMax(acc_x_array);
        let acc_x_min = MyMin(acc_x_array);
        let acc_y_max = MyMax(acc_y_array)
        let acc_y_min = MyMin(acc_y_array)
        let acc_z_max = MyMax(acc_z_array)
        let acc_z_min = MyMin(acc_z_array)
        console.log('X max', MyMax(acc_x_array));
        console.log('X min', MyMin(acc_x_array));
        console.log('Y max', MyMax(acc_y_array));
        console.log('Y min', MyMin(acc_y_array));
        console.log('Z max', MyMax(acc_z_array));
        console.log('Z min', MyMin(acc_z_array));

        try{
            const pool = await poolPromise
            if (pool) {
                console.log('Insertando en la base de datos');
                await pool
                .request()
                .input('acc_x', sql.Float, acc_x_max)
                .input('acc_y', sql.Float, acc_y_max)
                .input('acc_z', sql.Float, acc_z_max)
                /* .input('gyr_x', sql.Float, gyr_x)
                .input('gyr_y', sql.Float, gyr_y)
                .input('gyr_z', sql.Float, gyr_z) */
                .input('time', sql.DateTime, new Date())
                .query(queries.insertAccHeadHX3)
                await pool
                .request()
                .input('acc_x', sql.Float, acc_x_min)
                .input('acc_y', sql.Float, acc_y_min)
                .input('acc_z', sql.Float, acc_z_min)
                .input('time', sql.DateTime, new Date())
                .query(queries.insertAccHeadHX3)

            } else {
                console.log('no connection');
            }
            
        }catch(error){
            console.log(error);
        } 

        acc_x_array = [] 
        acc_y_array = [] 
        acc_z_array = [] 
    }
})




export const insertTemperature = (req, res) => {
    
    res.send('insertando')
    clientMqtt.on('message', (topic, message)=>{
        message = message.toString
        console.log(message);
        console.log('message');
    })

    //validacion tosca, se puede hacer con bibliotecas
    /*if (temp == null || tempe == null) {
        return res.status(400).json({msg : 'Bad request. Faltan datos'})
    }
    if (noDato == null) noDato = 0; //si no hay dato queda por defecto en 0

    try {//hay mejores formas de validar el error, este es un ejemplo.
        const pool = await getConnection()
        await pool
        .request()
        .input('temp', sql.VarChar, temp)
        .query(queries.addEquipment)

        console.log(temp, tempe, noDato);
        res.json({temp})
    } catch (error) {
        res.status(500)
        res.send(error.message)    
    }*/
}


//ACCELEROMETER

export const deviceAccGetChart = (req, res) => {
    res.render('deviceAcc')
}

export const accelerometerChart = (req, res) => {
    res.render('deviceAccDb')
}

export const getAccelerometerChart = async (req, res) => {

    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAccHeadHX3)
        
        //let keys = Object.keys(result.recordset.columns)
        
        return res.json(result.recordset)
        res.render('deviceAccDb')//se pasa el archivo sin extension ejs

    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}