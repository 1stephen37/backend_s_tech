import {Request, Response, NextFunction} from "express";
import {verifyToken} from '../libraries/Token.library';
import {JwtPayload} from "jsonwebtoken";
import {Error} from "sequelize";

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const data: JwtPayload | string | any = verifyToken(token);
            if (data instanceof Error) {
                res.status(401).json({error: 'access token invalid'})
            } else if (data.role !== 1) {
                res.status(401).json({error: 'user cannot use this src'});
            } else {
                next();
            }
        }
    } catch (error: Error | any) {
        res.status(401).json({error: error.message});
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const data = verifyToken(token);
            if (data instanceof Error) {
                res.status(401).json({error: 'access token invalid'})
            } else {
                next();
            }
        } else {
            res.status(401).json({error: 'Not authoried!!'});
        }
    } catch (error: Error | any) {
        res.status(401).json({error: error.message});
    }
}

const authUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const data: JwtPayload | string | any = verifyToken(token);
            if (data instanceof Error) {
                res.status(401).json({error: 'access token invalid'})
            } else if (data.role !== 0) {
                res.status(401).json({error: 'only user allowed to access this src'})
            } else {
                next();
            }
        } else {
            res.status(401).json({error: 'Not authoried!!'});
        }
    } catch (error: Error | any) {
        res.status(401).json({error: error.message});
    }
}

export {
    auth,
    authUser,
    authAdmin
}
