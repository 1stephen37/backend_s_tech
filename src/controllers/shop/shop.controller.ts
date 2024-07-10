import { Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";

const ShopController = Router();

ShopController.get('', async (req : Request, res : Response) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error : error.message});
    }
})

export default ShopController;
