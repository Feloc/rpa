import { Router } from "express"
import {getEquipment, getEquipmentById, createEquipment, editEquipment, deleteEquipmentById, getTotalEquipment, updateEquipmentById} from '../controllers/equipment.controllers.js'

const router = Router()



router.get('/equipment', getEquipment)
router.get('/equipment/:id', getEquipmentById)
router.get('/equipment/count', getTotalEquipment) 
router.post('/equipment', createEquipment)
router.put('/equipment/:id', updateEquipmentById)
router.delete('/equipment/:id', deleteEquipmentById)


export default router