import Products from "../../entities/products/products.entity";

export default class ProductService {
    static async FindProductsByFilter(filter : {} = { raw: true }) {
        if(filter) filter = { ...filter, raw: true };
        return await Products.findAll(filter);
    }
    static async getOneProductPyPk(id_product : string) {
        return await Products.findByPk(id_product, { raw: true });
    }
    static async getCountProductsByStatus(status : number) {
        return await Products.count({
            where: {
                status: status
            }
        })
    }
    static async getCountProductsByIdBrand(id_brand : string) {
        return await Products.count({
            where: {
                id_brand: id_brand
            }
        })
    }
}
