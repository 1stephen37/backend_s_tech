import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";
import VouchersService from "../../services/vouchers/vouchers.service";
import {Op} from "sequelize";

const vouchersController = Router();

vouchersController.get('', async (req: Request, res: Response) => {
    try {
        const amount = req.query.amount;
        let filter: { where?: {} } = {}
        if (amount) {
            filter.where = {
                min_amount: {
                    [Op.lte]: amount // Lấy các voucher có min_amount <= amount
                }
            }
        }
        const vouchersList = await VouchersService.findAllVouchersByFilter(filter);
        res.status(200).json({
            data: vouchersList
        })

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

export default vouchersController;
