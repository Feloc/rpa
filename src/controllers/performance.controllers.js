import { poolPC } from "../database/connection.js";
import { queries } from "../database/queries.js";

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