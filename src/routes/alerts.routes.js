import { Router } from "express";
import { deleteAlert, getAlerts, registerAlert } from "../controllers/alerts.controllers.js"

const router = Router();


router.get('/viewAlerts', (req, res) => {
    res.render('viewAlerts')
})

router.post('/registerAlert', registerAlert)

router.get('/alerts', getAlerts)
router.delete('/alerts/:id',deleteAlert)

 

export default router