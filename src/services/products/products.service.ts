import Products from "../../entities/products/products.entity";

export default class ProductService {
    static async FindAllProducts(filter : {} = { raw: true }) {
        if(filter) filter = { ...filter, raw: true };
        return await Products.findAll(filter);
    }
    static async getOneProductPyPk(id_product : string) {
        return await Products.findByPk(id_product, { raw: true });
    }
}
