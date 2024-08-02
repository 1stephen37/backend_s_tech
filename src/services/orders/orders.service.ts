import OrdersEntity from "../../entities/orders/orders.entity";

export default class OrdersService {
    static async findAllOrders() {

    }

    static async CreateOrder(order : {}) {
        return await OrdersEntity.create(order, {
            returning: true,
            raw: true
        })
    }

}
