import {Router, Request, Response} from 'express';

const  BrandsController = Router();

BrandsController.get('', async (req : Request, res : Response) => {
    res.status(200).json({

    })
})

BrandsController.post('', async (req : Request, res : Response) => {
    res.status(200).json({

    })
})

BrandsController.patch('', async (req : Request, res : Response) => {
    res.status(200).json({

    })
})

BrandsController.get('/:id', async (req : Request, res : Response) => {
    res.status(200).json({

    })
})

export default BrandsController
