import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";

const TestController = Router();

TestController.get('', async (req: Request, res: Response) => {
    try {
        res.status(HttpStatus.SUCCESS).json({
            data: 'test'
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

export default TestController;
