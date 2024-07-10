import Gallery from "../../entities/gallery/gallery.entity";


export default class GalleryService {
    static async FindAllGallery(){
        return await Gallery.findAll({raw : true});
    }
    static async FindPrimaryGalleryImageByIdProduct(id_product: string){
        return await Gallery.findOne( { where: { id_product : id_product, is_primary : true }, attributes : ['url'] , raw: true });
    }
}
