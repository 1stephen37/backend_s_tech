import OrdersEntity from "../../entities/orders/orders.entity";

export default class OrdersService {
    static async findAllOrders(filter: {} = {raw: true}) {
        if (filter) filter = {...filter, raw: true};
        return OrdersEntity.findAll(filter)
    }

    static async CreateOrder(order: {}) {
        return await OrdersEntity.create(order, {
            returning: true,
            raw: true
        })
    }

}
