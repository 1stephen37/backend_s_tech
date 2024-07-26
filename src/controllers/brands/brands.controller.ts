import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import BrandsService from "../../services/brands/brands.service";

const BrandsController = Router();

BrandsController.get('', async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit;
        let filter: { limit?: number } = {};
        if (limit) filter.limit = parseInt(limit as string);
        const data = await BrandsService.FindAllBrands(filter);
        res.status(HttpStatus.SUCCESS).json({data});
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

BrandsController.post('', async (req: Request, res: Response) => {
    try {
        const brands = req.body.data;
        const newBrand = await BrandsService.CreateBrand(brands);
        res.status(HttpStatus.SUCCESS).json({data: newBrand});
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

BrandsController.patch('', async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            data: [{
                "test": 'test1'
            }]
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

BrandsController.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await BrandsService.FindBrandById(id);
        res.status(200).json({data});
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error})
    }
})

export default BrandsController
