import { Router } from "express";
import { getAvailabilityData, getEquipmentData, getEquipmentDataByClass, getFilteredEquipmentData, getFilteredEquipmentDataByClass, getFilteredPerformanceData, getMTBFData, getMTTRData, getPerformanceData, renderPerformancePage } from "../controllers/performance.controllers.js";

const router = Router();

// Ruta para obtener los datos de rendimiento en formato JSON
router.get('/performance/data', getPerformanceData);
router.get('/equipment/data', getEquipmentData);
router.get('/equipmentClass/data', getEquipmentDataByClass);
router.get('/performance/filtered', getFilteredPerformanceData);
router.get('/equipment/filtered', getFilteredEquipmentData);
router.get('/equipmentClass/filtered', getFilteredEquipmentDataByClass);
router.get('/performance/mtbf', getMTBFData);
router.get('/performance/mttr', getMTTRData);
router.get('/performance/availability', getAvailabilityData);

// Ruta para renderizar la página de rendimiento
router.get('/performance', renderPerformancePage);

export default router;