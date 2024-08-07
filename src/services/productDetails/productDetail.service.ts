import ProductDetails from "../../entities/product_details/product_details.entity";

export default class ProductDetailService {
    static async findAllDetailsByIdSpecificationCategory(id_specification_category: string, attributes?: string[]) {
        return await ProductDetails.findAll({
            where: {
                id_specification_category
            },
            raw: true,
            attributes
        });
    }

    static async createDetail(detail: {}) {
        return await ProductDetails.create(detail, {
            returning: true,
            raw: true
        })
    }
}
