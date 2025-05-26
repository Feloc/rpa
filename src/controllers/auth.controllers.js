import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { poolPC } from '../database/connection.js';


export const index = (req, res)=>{
    res.render('index',{title : "RPA"})
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await poolPC.request().input('email', email).query('SELECT * FROM users WHERE email = @email');
        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
        console.log(token);
        

        // Establecer la cookie en el cliente
        res.cookie('authToken', token, { httpOnly: true, secure: false, sameSite:'lax' }); // Cambia `secure: true` si usas HTTPS
        res.redirect('/'); // Redirigir al dashboard
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).send('Error interno');
    }
};


export const registerUser = async (req, res) => {
    const { name, email, password, credential } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await poolPC.request()
            .input('name', name)
            .input('email', email)
            .input('password', hashedPassword)
            .input('credential', credential) // Guardar la credencial seleccionada
            .query('INSERT INTO users (name, email, password, credential) VALUES (@name, @email, @password, @credential)');

        res.redirect('/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error interno');
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/login');
};