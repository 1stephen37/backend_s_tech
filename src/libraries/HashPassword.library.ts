import bcrypt from "bcrypt";
import {environment} from "../constants";

async function hashPassword(plainPassword : string) {
    try {
        return await bcrypt.hash(plainPassword, environment.saltRounds);
    } catch (error) {
        throw error;
    }
}

async function comparePassword(plainPassword : string, hashedPassword : string) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw error;
    }
}

export {
    hashPassword,
    comparePassword
}
