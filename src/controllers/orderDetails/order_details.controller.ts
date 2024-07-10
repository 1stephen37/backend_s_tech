import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";

const Order_detailsController = Router();

Order_detailsController.get('', async (req : Request, res : Response) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default Order_detailsController;
