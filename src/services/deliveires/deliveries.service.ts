import Deliveries from "../../entities/deliveries/deliveries.entity";

export default class DeliveriesService {
    static async findAllDeliveries(filter?: {}) {
        return await Deliveries.findAll({...filter, raw: true});
    }

    static async findDeliveries() {

    }

    static async createDelivery(delivery: {}) {
        return await Deliveries.create(delivery, {
            returning: true,
            raw: true
        });
    }

    static async deleteDelivery(id_delivery: string) {
        return await Deliveries.destroy({
            where: {
                id_delivery: id_delivery
            }
        })
    }

    static async updateDelivery(id_delivery: string, delivery: {}) {
        return await Deliveries.update(delivery, {
            where: {
                id_delivery: id_delivery
            }
        })
    }
}
