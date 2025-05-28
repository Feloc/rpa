import jwt from 'jsonwebtoken';
import { poolPC } from '../database/connection.js';

export const isAuthenticated = async (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies?.authToken; // Verifica si `authToken` existe en las cookies
    if (!token) {
        console.log("Token no encontrado, redirigiendo al login...");
        return res.redirect('/login');
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, 'SECRET_KEY');
        console.log("Token decodificado:", decoded); // Muestra los datos del token para depuración
        req.user = decoded; // Guardamos los datos del usuario en `req.user`

        // Obtener la credencial del usuario desde la base de datos
        const result = await poolPC.request()
            .input('id', decoded.id)
            .query('SELECT credential FROM users WHERE id = @id');

        if (result.recordset.length > 0) {
            req.user.credential = result.recordset[0].credential; // Guardamos la credencial
        } /* else {
            console.error("No se encontró la credencial del usuario.");
            return res.redirect('/login');
        } */

        next();
    } catch (error) {
        console.error("Token inválido o expirado:", error.message);
        return res.redirect('/login');
    }
};

/* export const restrictUserAccess = (req, res, next) => {
    if (req.user.credential === 4) {
        console.log("Acceso denegado para usuario estándar a esta página.");
        return res.redirect('/'); // Redirigir a otra página accesible
    }
    next();
}; */

/* export const restrictUserAccess = (req, res, next) => {
    // Si el usuario tiene credencial 4 (User) o credencial 2 (Manager), restringimos Taller y Crono
    if (req.user.credential === 4 || req.user.credential === 2) {
        const restrictedPages = ['/viewWorkshopNotices', '/viewAlerts'];
        
        if (restrictedPages.includes(req.originalUrl)) {
            console.log(`Acceso denegado: ${req.user.email} no puede acceder a ${req.originalUrl}`);
            return res.redirect('/'); // Redirigir al Dashboard en caso de restricción
        }
    }
    next();
}; */

export const restrictUserAccess = (req, res, next) => {
    // Usuarios con credential 4 (user) son bloqueados completamente
    if (req.user.credential === 4) {
        console.log(`Acceso denegado: ${req.user.email} no puede acceder a ${req.originalUrl}`);
        return res.redirect('/'); // Redirigir al Dashboard para usuarios estándar
    }

    // Usuarios con credential 2 (manager) solo pueden acceder a Reportes
    const restrictedPages = ['/viewWorkshopNotices', '/viewAlerts'];
    const restrictedPagesSupervisor = ['/viewNotices', '/viewWorkshopNotices', '/viewAlerts', /* '/noticesHistory' */, '/performance'];
    const restrictedPagesTaller = ['/review', '/viewAlerts', '/performance'];
    if (req.user.credential === 2 && restrictedPages.includes(req.originalUrl)) {
        console.log(`Acceso denegado: ${req.user.email} no puede acceder a ${req.originalUrl}`);
        return res.redirect('/');
    }
    if (req.user.credential === 3 && restrictedPagesSupervisor.includes(req.originalUrl)) {
        console.log(`Acceso denegado: ${req.user.email} no puede acceder a ${req.originalUrl}`);
        return res.redirect('/');
    }
    if (req.user.credential === 5 && restrictedPagesTaller.includes(req.originalUrl)) {
        console.log(`Acceso denegado: ${req.user.email} no puede acceder a ${req.originalUrl}`);
        return res.redirect('/');
    }

    next(); // Si pasa todas las verificaciones, puede acceder a la ruta
};