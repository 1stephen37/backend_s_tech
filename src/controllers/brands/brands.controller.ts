import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import BrandsService from "../../services/brands/brands.service";
import ProductService from "../../services/products/products.service";

const BrandsController = Router();

BrandsController.get('', async (req: Request, res: Response) => {
    try {
        const role = req.query.role;
        const limit = req.query.limit;
        const offset = req.query.offset;
        let count = 0;
        let filter: { limit?: number, offset?: number } = {};
        if (limit) filter.limit = parseInt(limit as string);
        if (offset) filter.offset = parseInt(offset as string);
        const brandsList = await BrandsService.FindAllBrands(filter);
        console.log(role);
        if (role && role.toString() === 'admin') {
            for (let index in brandsList) {
                brandsList[index].count = await ProductService.getCountProductsByBrand(brandsList[index].id_brand)
            }
        }
        res.status(HttpStatus.SUCCESS).json({data: brandsList});
    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

BrandsController.post('/create', async (req: Request, res: Response) => {
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
