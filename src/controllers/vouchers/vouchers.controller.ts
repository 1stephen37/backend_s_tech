import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";

const vouchersController = Router();

vouchersController.get('', async (req : Request, res: Response ) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error : error.message})
    }
})

export default vouchersController;
