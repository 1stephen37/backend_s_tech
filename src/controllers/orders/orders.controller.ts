import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";

const ordersController = Router();

ordersController.get('', async (req : Request, res: Response ) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.InternalServerError).json({error : error.message})
    }
})

export default ordersController;
