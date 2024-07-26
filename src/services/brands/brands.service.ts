import BrandsEntity from "../../entities/brands/brands.entity";

export default class BrandsService {
    static async FindAllBrands(filter: {} = {raw: true}) {
        if (filter) filter = {...filter, order: ['id_brand'], raw: true};
        return await BrandsEntity.findAll(filter);
    }

    static async FindBrandById(id: string) {
        return await BrandsEntity.findOne({where: {id_brand: id}, raw: true});
    }

    static async FindNameBrandById(id: string) {
        return await BrandsEntity.findOne({where: {id_brand: id}, raw: true, attributes: ['name']});
    }

    static async CreateBrand(brand: BrandsEntity) {
        return await BrandsEntity.create({...brand}, {returning: true, raw: true})
    }
}
