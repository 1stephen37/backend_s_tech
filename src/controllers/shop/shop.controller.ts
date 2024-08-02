import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";
import ShopService from "../../services/shop/shop.service";

const ShopController = Router();

ShopController.get('', async (req: Request, res: Response) => {
    try {
        const shop = await ShopService.findInformation();
        res.status(HttpStatus.SUCCESS).json({
            data: shop[0]
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

export default ShopController;
