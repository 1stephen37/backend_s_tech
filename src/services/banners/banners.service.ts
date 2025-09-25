import BannersEntity from "../../entities/banners/banners.entity";

export default class BannersService {
    static async FindBannersByFilter(filter: {} = {raw: true}) {
        if (filter) filter = {...filter, order: ['id_banner'], raw: true};
        return await BannersEntity.findAll(filter);
    }

}
