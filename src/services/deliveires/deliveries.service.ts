import Deliveries from "../../entities/deliveries/deliveries.entity";

export default class DeliveriesService {
    static async findAllDeliveries(filter?: {}) {
        return await Deliveries.findAll({...filter, raw: true});
    }

    static async findDeliveries() {

    }
}
