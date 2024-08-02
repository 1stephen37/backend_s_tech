import Order_detailsEntity from "../../entities/order_detail/order_details.entity";

export default class OrderDetailsService {
    static async findOrderDetailsByOrder(id_order: string) {

    }

    static async createOrderDetails(orderDetail : {}) {
        return await Order_detailsEntity.create(orderDetail, {
            returning: true,
            raw: true
        })
    }
}
