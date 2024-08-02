import ShopEntity from "../../entities/shop/shop.entity";

export default class ShopService {
    static findInformation() {
        return ShopEntity.findAll({raw: true});
    }
}
