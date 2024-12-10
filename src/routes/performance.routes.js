import { Router } from "express";
import { getPerformanceData, renderPerformancePage } from "../controllers/performance.controllers.js";

const router = Router();

// Ruta para obtener los datos de rendimiento en formato JSON
router.get('/performance/data', getPerformanceData);

// Ruta para renderizar la página de rendimiento
router.get('/performance', renderPerformancePage);

export default router;
