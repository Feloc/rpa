import { Router } from "express"
import { inicio, about, contact } from '../controllers/index.controller.js'

const router = Router()


router.get('/', inicio)
router.get('/about', about)
router.get('/contact', contact)




export default router