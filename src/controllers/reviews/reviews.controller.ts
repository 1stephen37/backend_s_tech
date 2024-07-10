import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";

const ReviewsController = Router();

ReviewsController.get('', async (req : Request, res: Response) => {
    try {
        const isProduct = req.query.id_product;


    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.get('', async (req : Request, res: Response) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.get('/:id', async (req : Request, res: Response) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default ReviewsController;
