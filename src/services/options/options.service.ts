import Options from "../../entities/options/options.entity";

export default class OptionsService {
    static async findOneOptionBasicByIdProduct(id_product: string, attributes?: string[]) {
        return await Options.findOne({
            where: {
                id_product: id_product,
                is_basic: true
            },
            attributes: attributes,
            raw: true
        })
    }

    static async findAllOptionsByIdProduct(id_product: string, attributes?: string[]) {
        return await Options.findAll({
            where: {
                id_product: id_product,
            },
            attributes: attributes,
            raw: true
        })
    }

    static async createOption(option: {}, attributes?: string) {
        return await Options.create(option, {
            returning: true,
            raw: true
        })
    }
}
