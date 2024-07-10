import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import ProductService from "../../services/products/products.service";
import GalleryService from "../../services/gallery/gallery.service";
import BrandsService from "../../services/brands/brands.service";
import OptionsService from "../../services/options/options.service";
import {Op} from 'sequelize';

const ProductsController = Router();

ProductsController.get('', async (req: Request, res: Response) => {
    try {
        let status = req.query.status;
        const page = req.query.page;
        const id_brand = req.query.id_brand;
        const sale = req.query.sale;
        const offset = req.query.offset;
        const limit = req.query.limit;
        const sort = req.query.sort;
        const property = req.query.property;
        const keyword = req.query.keyword;
        let filter: {
            where?: { id_brand?: string, name?: {}, status?: number },
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
        if (status) {
            if (filter.where) {
                filter.where.status = parseInt(status.toString())
            } else {
                filter.where = {
                    status: parseInt(status.toString())
                };
            }
        } else {
            if (filter.where) {
                filter.where.status = 1
            } else {
                filter.where = {
                    status: 1
                };
            }
        }
        let count = 0;
        if (page && !id_brand) {
            count = await ProductService.getCountProductsByStatus(1);
        } else if (page && status && !id_brand) {
            count = await ProductService.getCountProductsByStatus(parseInt(status.toString()));
        } else if (page && id_brand) {
            count = await ProductService.getCountProductsByIdBrand(id_brand.toString());
        }
        console.log(count)
        let products = await ProductService.FindProductsByFilter(filter);
        for (const index in products) {
            const gallery = await GalleryService.FindPrimaryGalleryImageByIdProduct(products[index].id_product);
            if (gallery) products[index].image = gallery.url;
            const brand = await BrandsService.FindNameBrandById(products[index].id_brand);
            if (brand) products[index].brand_name = brand.name;
            const options = await OptionsService.findOneOptionBasicByIdProduct(products[index].id_product, ['color', 'price', 'memory']);
            if (options) {
                products[index].color = options.color;
                products[index].memory = options.memory;
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
            const gallery = await GalleryService.FindPrimaryGalleryImageByIdProduct(product.id_product);
            if (gallery) product.image = gallery.url;
            const brand = await BrandsService.FindNameBrandById(product.id_brand);
            if (brand) product.brand_name = brand.name;
            const optionsList = await OptionsService.findAllOptionsByIdProduct(product.id_product);
            if (optionsList) {
                console.log(optionsList)
            }
        }
        if (!product) res.status(HttpStatus.NOT_FOUND).json({message: 'Product not found'});
        res.status(HttpStatus.SUCCESS).json({data: product});
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

export default ProductsController;
