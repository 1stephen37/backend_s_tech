import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";

const DashboardController = Router();

DashboardController.get('/', async (req: Request, res: Response) => {
    try {
        res.status(HttpStatus.SUCCESS).json({
            data: '1'
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

DashboardController.get('/statistical', async (req: Request, res: Response) => {
    try {
        res.status(HttpStatus.SUCCESS).json({
            data: '1'
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

export default DashboardController;
