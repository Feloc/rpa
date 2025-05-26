import { Router } from 'express';
import { loginUser, registerUser, logoutUser, index } from '../controllers/auth.controllers.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();


router.get('/',isAuthenticated, index)

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logoutUser);

export default router;