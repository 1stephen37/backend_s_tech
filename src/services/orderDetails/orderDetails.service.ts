import Order_detailsEntity from "../../entities/order_detail/order_details.entity";

export default class OrderDetailsService {
    static async findOrderDetailsByOrder(id_order: string, attributes? : string[]) {
        return await Order_detailsEntity.findAll({
            where: {
                id_order: id_order
            },
            attributes,
            raw: true
        })
    }

    static async createOrderDetails(orderDetail: {}) {
        return await Order_detailsEntity.create(orderDetail, {
            returning: true,
            raw: true
        })
    }

    static async findOrderDetailWithFiler(filter: {} = {raw: true}) {
        if (filter) filter = {...filter, raw: true};
        return await Order_detailsEntity.findAll(filter);
    }
}
