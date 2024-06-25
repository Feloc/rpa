import { Router } from "express"; 
import { accelerometerChart, deviceAccGetChart, getAccelerometerChart, getTemperature, getTemperatureChart, insertTemperature, temperatureChart } from "../controllers/device.controller";


const router = Router()


router.get('/deviceTemp', getTemperature)
router.get('/deviceTempChart', getTemperatureChart)
router.get('/deviceTemperature', temperatureChart)
router.get('/deviceTempInsert', insertTemperature)
router.get('/deviceAcc', deviceAccGetChart)
router.get('/deviceAccelerometer', accelerometerChart)
router.get('/deviceAccChart', getAccelerometerChart)



export default router