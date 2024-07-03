import { sql, poolPC } from "../database/connection.js";
import {queries} from "../database/queries.js"

import bcrypt from "bcrypt";



/* export const getUserByPassword = async (password) => {
    try {
        const result = await poolPC
        .request()
        .query(queries.getUsers)

        const users = result.recordset

        for (let user of users) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return user;
            }
        }

        return null
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
} */

export const getUserByPassword = async (password) => {
    try {
        const result = await poolPC
        .request()
        .query(queries.getUsers)

        const users = result.recordset

        for (let user of users) {
            if (password == user.pass) {
                return user;
            }
        }
        //return null
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}