import { getConnection, sql, queries } from "../database";

export const getEquipment = async(req, res) => {
    try {
        const pool = await getConnection()
        const result = await pool.request().query(queries.getAllEquipments)
        console.log(result);
        res.json(result.recordset)    
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
    
}


export const createEquipment = async (req, res) => {
    const {temp, tempe} = req.body //recibir los datos que quiero rebir como constante
    let {noDato} = req.body//los que quiero recibir como variables

    //validacion tosca, se puede hacer con bibliotecas
    if (temp == null || tempe == null) {
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
    }
}

export const getEquipmentById = async (req, res) => {
    const {id} = req.params

    const pool = await getConnection()
    const result = await pool
    .request()
    .input('Id', id)
    .query(queries.getEquipmentById)

    //console.log(result);
    res.send(result.recordset[0])
}

export const deleteEquipmentById = async (req, res) => {
    const {id} = req.params

    const pool = await getConnection()
    const result = await pool
    .request()
    .input('Id', id)
    .query(queries.deletEquipmentById)

    //console.log(result);
    res.sendStatus(204)//significa que ha sido correcto el rango del 200 significa que le respuesta fue correcta
}

export const getTotalEquipment = async (req, res) => {

    const pool = await getConnection()
    const result = await pool
    .request()
    .query(queries.getTotalEquipment)

    //console.log(result);
    res.sendStatus(204)//significa que ha sido correcto el rango del 200 significa que le respuesta fue correcta
}

export const updateEquipmentById = async (req, res) =>{
    const {temp} = req.body
    const {id} = req.params
    if (temp == null) {
        return res.status(400).json({msg : 'Bad request. Faltan datos'})
    }
    const pool = await getConnection()
    const result = await pool
    .request()
    .input('temp', sql.VarChar, temp)
    //.input() si se tienen mas datos para modificar
    .input('Id', id)
    .query(queries.updateEquipmentById)

    res.json({temp})
}

export const editEquipment = (req, res) => {
    res.send('equipo editado')
}

export const deleteEquipment = (req, res) => {
    res.send('equipo borrado')
}