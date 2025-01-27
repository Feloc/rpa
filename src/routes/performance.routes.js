import { Router } from "express";
import { getEquipmentData, getEquipmentDataByClass, getFilteredEquipmentData, getFilteredEquipmentDataByClass, getFilteredPerformanceData, getPerformanceData, renderPerformancePage } from "../controllers/performance.controllers.js";

const router = Router();

// Ruta para obtener los datos de rendimiento en formato JSON
router.get('/performance/data', getPerformanceData);
router.get('/equipment/data', getEquipmentData);
router.get('/equipmentClass/data', getEquipmentDataByClass);
router.get('/performance/filtered', getFilteredPerformanceData);
router.get('/equipment/filtered', getFilteredEquipmentData);
router.get('/equipmentClass/filtered', getFilteredEquipmentDataByClass);

// Ruta para renderizar la página de rendimiento
router.get('/performance', renderPerformancePage);

export default router;