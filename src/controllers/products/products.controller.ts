import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import ProductService from "../../services/products/products.service";
import GalleryService from "../../services/gallery/gallery.service";
import BrandsService from "../../services/brands/brands.service";
import OptionsService from "../../services/options/options.service";
import {Op} from 'sequelize';
import ProductDetailService from "../../services/productDetails/productDetail.service";
import SpecificationCategoryService from "../../services/SpecificationCategory/SpecificationCategory.service";

const ProductsController = Router();

ProductsController.get('', async (req: Request, res: Response) => {
    try {
        const page = req.query.page;
        const id_brand = req.query.id_brand;
        const sale = req.query.sale;
        const offset = req.query.offset;
        const limit = req.query.limit;
        const sort = req.query.sort;
        const property = req.query.property;
        const keyword = req.query.keyword;
        let filter: {
            where?: { id_brand?: string, name?: {} },
            offset?: number,
            limit?: number,
            order?: [[string, string]]
        } = {};
        if (offset) filter.offset = parseInt(offset as string);
        if (limit) filter.limit = parseInt(limit as string);
        if (sale) filter.order = [
            ['sale_off', sale.toString()]
        ];
        if (property && sort) filter.order = [
            [property.toString(), sort.toString()]
        ];
        if (id_brand) {
            if (filter.where) {
                filter.where.id_brand = id_brand.toString();
            } else {
                filter.where = {
                    id_brand: id_brand.toString()
                };
            }
        }
        if (keyword) {
            if (filter.where) {
                filter.where.name = {
                    [Op.iLike]: `%${keyword}%` // Sử dụng iLike để không phân biệt hoa/thường
                }
            } else {
                filter.where = {
                    name: {
                        [Op.iLike]: `%${keyword}%`
                    }
                };
            }
        }
        let count = 0;
        if (page && id_brand && !keyword) {
            count = await ProductService.getCountProductsByBrand(id_brand.toString());
        } else if (page && keyword) {
            count = await ProductService.getCountProductsByKeyword(keyword.toString());
        } else if (page) {
            count = await ProductService.getCountAllProductsByStatus();
        }
        let products = await ProductService.FindAllProducts(filter);
        for (const index in products) {
            const [gallery, brand, options] = await Promise.all([
                GalleryService.FindPrimaryGalleryImageByIdProduct(products[index].id_product),
                BrandsService.FindNameBrandById(products[index].id_brand),
                OptionsService.findOneOptionBasicByIdProduct(products[index].id_product, ['color', 'price', 'memory'])
            ]);
            if (gallery) products[index].image = gallery.url;
            if (brand) products[index].brand_name = brand.name;
            if (options) {
                products[index].memory = options.memory;
                products[index].color = options.color;
                products[index].price = options.price;
            }
        }
        if (sort && !property && sort === 'asc') {
            products = products.sort((a, b) => a.price - b.price);
        } else if (sort && !property) {
            products = products.sort((a, b) => b.price - a.price);
        }
        res.status(HttpStatus.SUCCESS).json({
            data: products,
            paging: {
                total: count
            }
        })
    } catch (error: Error | any) {
        console.log(error.message)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
})

ProductsController.get('/detail/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(HttpStatus.NO_CONTENT).json({message: 'don\'t have a id to find product'})
        }
        let product = await ProductService.getOneProductPyPk(id);
        if (product) {
            const brand = await BrandsService.FindNameBrandById(product.id_brand);
            if (brand) product.brand_name = brand.name;
            let optionsList = await OptionsService.findAllOptionsByIdProduct(product.id_product, ['color', 'price', 'quantity', 'memory', 'id_gallery']);
            if (optionsList) {
                for (const index in optionsList) {
                    const gallery = await GalleryService.FindAllGalleryImageById(optionsList[index].id_gallery);
                    if (gallery) optionsList[index].image = gallery.url;
                }
                product.options = optionsList;
            }
            let SpecificationCategoryList = await SpecificationCategoryService.findAllSpecificationCategoryByIdProduct(product.id_product, ['name', 'id_specification_category']);
            if (SpecificationCategoryList) {
                console.log(SpecificationCategoryList)
                if (SpecificationCategoryList.length > 0) {
                    for (let index in SpecificationCategoryList) {
                        let detail = await ProductDetailService.findAllDetailsByIdSpecificationCategory(SpecificationCategoryList[index].id_specification_category, ['name', 'value']);
                        if (detail) {
                            SpecificationCategoryList[index].detail = detail
                        }
                    }
                    product.details = SpecificationCategoryList;
                }
            }
        }
        if (!product) res.status(HttpStatus.NOT_FOUND).json({message: 'Product not found'});
        res.status(HttpStatus.SUCCESS).json({data: product});
    } catch (error: Error | any) {
        console.log(error.message)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

export default ProductsController;
