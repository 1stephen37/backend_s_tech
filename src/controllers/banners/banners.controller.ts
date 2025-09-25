import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import BannersService from "../../services/banners/banners.service";

const BannersController = Router();

BannersController.get('', async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        let total = 0;
        const banners = await BannersService.FindBannersByFilter();
        res.status(HttpStatus.SUCCESS).json({data: banners});
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

BannersController.get('/home', async (req: Request, res: Response) => {
    try {
        const bannersActiveList = await BannersService.FindBannersByFilter({
            status: 1
        });
        res.status(HttpStatus.SUCCESS).json({data: bannersActiveList});
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

export default BannersController;