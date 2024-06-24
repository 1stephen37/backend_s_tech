import { Router, Request, Response } from 'express';

const categoriesController = Router();

categoriesController.get('/', async (req : Request, res : Response) => {
    res.status(200).json({
        data: [
            {
                'test': 1
            },
            {
                'test': 2
            }
        ]
    })
})

export default categoriesController;

