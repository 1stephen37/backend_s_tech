import ProductDetails from "../../entities/product_details/product_details.entity";

export default class ProductDetailService {
    static async findDetailByIdProduct(id_product: string) {
        return await ProductDetails.findOne({
            where: {
                id_product: id_product
            },
            raw: true
        });
    }
}
