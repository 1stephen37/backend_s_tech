import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import ReviewsService from "../../services/reviews/reviews.service";
import RepliesService from "../../services/replies/replies.service";
import UsersService from "../../services/users/users.service";

const ReviewsController = Router();

ReviewsController.get('', async (req: Request, res: Response) => {
    try {
        const idProduct = req.query.id_product;
        let filter: {
            where?: {}
        } = {};
        if (idProduct) filter.where = {
            id_product: idProduct.toString()
        }
        let reviewsList = await ReviewsService.FindAllReviews(filter);
        if (reviewsList.length > 0) {
            for (let index in reviewsList) {
                const [replies, user] = await Promise.all([
                    RepliesService.FindAllRepliesByIdReview(reviewsList[index].id_review, ['content','created_at','updated_at', 'id_user']),
                    UsersService.findUsersById(reviewsList[index].id_user, ['name', 'image'])
                ])
                if (user) {
                    reviewsList[index].name = user.name;
                    reviewsList[index].avatar = user.image;
                }
                if (replies) {
                    if (replies.length > 0) {
                        for (let index in replies) {
                            const user = await UsersService.findUsersById(replies[index].id_user, ['name', 'image']);
                            if (user) {
                                replies[index].name = user.name;
                                replies[index].avatar = user.image;
                            }
                        }
                    }
                    reviewsList[index].replies = replies
                }

            }
        }
        res.status(HttpStatus.SUCCESS).json({
            data: reviewsList
        })

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

ReviewsController.get('', async (req: Request, res: Response) => {
    try {

    } catch (error: Error | any) {
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
