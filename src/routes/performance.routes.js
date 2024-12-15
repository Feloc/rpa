import { Router } from "express";
import { getEquipmentData, getFilteredEquipmentData, getFilteredPerformanceData, getPerformanceData, renderPerformancePage } from "../controllers/performance.controllers.js";

const router = Router();

// Ruta para obtener los datos de rendimiento en formato JSON
router.get('/performance/data', getPerformanceData);
router.get('/equipment/data', getEquipmentData);
router.get('/performance/filtered', getFilteredPerformanceData);
router.get('/equipment/filtered', getFilteredEquipmentData);

// Ruta para renderizar la página de rendimiento
router.get('/performance', renderPerformancePage);

export default router;