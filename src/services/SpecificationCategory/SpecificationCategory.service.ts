import SpecificationCategory from "../../entities/specification_category/specification_category.entity";

export default class SpecificationCategoryService {
    static async findAllSpecificationCategoryByIdProduct(id_product: string, attributes?: string[]) {
        return await SpecificationCategory.findAll({
            where: {
                id_product: id_product
            },
            raw: true,
            attributes
        })
    }
}
