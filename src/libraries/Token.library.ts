import * as jwt from "jsonwebtoken";
import {environment} from "../constants";

const createToken = (idUser: string, role: number, expiresIn: number) => {
    const payload = {
        userId: idUser,
        role: role
    };
    return jwt.sign(payload, environment.secretKey, {expiresIn: expiresIn});
}

const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, environment.secretKey);
    } catch (error) {
        return error;
    }
}

export {
    createToken,
    verifyToken
}
