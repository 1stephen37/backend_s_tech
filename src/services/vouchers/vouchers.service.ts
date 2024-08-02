import Vouchers from "../../entities/vouchers/vouchers.entity";


export default class VouchersService {
    static async findAllVouchersByFilter(filter?: {}) {
        if (filter) filter = {...filter, raw: true};
        return await Vouchers.findAll(filter);
    }
}
