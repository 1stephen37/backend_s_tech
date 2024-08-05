import Products from "../../entities/products/products.entity";
import {Op} from "sequelize";
import ProductDetails from "../../entities/product_details/product_details.entity";

export default class ProductService {
    static async FindAllProducts(filter: {} = {raw: true}) {
        if (filter) filter = {...filter, raw: true};
        return await Products.findAll(filter);
    }

    static async getOneProductPyPk(id_product: string, attributes?: string[]) {
        return await Products.findByPk(id_product, {raw: true, attributes});
    }

    static async getCountProductsByBrand(id_brand: string, status: number = 1) {
        return await Products.count({
            where: {
                id_brand: id_brand,
                status: status
            }
        });
    }

    static async getCountProductsByKeyword(keyword: string, status: number = 1) {
        return await Products.count({
            where: {
                name: {
                    [Op.iLike]: `%${keyword}%`
                },
                status: status
            }
        });
    }

    static async getCountAllProductsByStatus(status: number = 1) {
        return await Products.count({
            where: {
                status: status
            }
        });
    }
}
