import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import ReviewsService from "../../services/reviews/reviews.service";
import UsersService from "../../services/users/users.service";
import ProductService from "../../services/products/products.service";

const ReviewsController = Router();

ReviewsController.get('', async (req: Request, res: Response) => {
    try {
        const idProduct = req.query.id_product;
        const limit = req.query.limit;
        const offset = req.query.offset;
        let filter: {
            where?: {},
            limit?: number,
            offset?: number
        } = {};
        if (idProduct) filter.where = {
            id_product: idProduct.toString()
        }
        if (limit) filter.limit = parseInt(limit.toString());
        if (offset) filter.offset = parseInt(offset.toString());
        let reviewsList = await ReviewsService.FindAllReviews(filter);
        if (reviewsList.length > 0) {
            for (let index in reviewsList) {
                const [user, product] = await Promise.all([
                    UsersService.findUsersById(reviewsList[index].id_user, ['name', 'image']),
                    ProductService.getOneProductPyPk(reviewsList[index].id_product, ['name']),
                ])
                if (user) {
                    reviewsList[index].name = user.name;
                    reviewsList[index].avatar = user.image;
                }
                if (product) {
                    reviewsList[index].product_name = product.name;
                    reviewsList[index].product_image = product.image;
                }
                if (reviewsList[index].id_reply) {
                    const indexParentReview = reviewsList.findIndex(r => r.id_review === reviewsList[index].id_reply);
                    const indexReviewNow = reviewsList.findIndex(r => r.id_review === reviewsList[index].id_review);
                    if (indexParentReview !== -1) {
                        reviewsList[indexParentReview].replies = [];
                        reviewsList[indexParentReview].replies.push(reviewsList[index]);
                    }
                    reviewsList.slice(indexReviewNow, indexReviewNow + 1);
                }

            }
        }
        res.status(HttpStatus.SUCCESS).json({
            data: reviewsList
        })

    } catch (error: Error | any) {
        console.error(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.get('/products/:id', async (req: Request, res: Response) => {
    try {

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.post('/reply/add', async (req: Request, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        res.status(HttpStatus.SUCCESS).json({
            data: data
        })
    } catch (error: Error | any) {
        console.log(error.message)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.get('/:id', async (req: Request, res: Response) => {
    try {

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default ReviewsController;
