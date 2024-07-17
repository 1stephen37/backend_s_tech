import ReviewsEntity from "../../entities/reviews/reviews.entity";

export default class ReviewsService {
    static async FindAllReviews(filter?: {}) {
        if (filter) filter = {...filter, raw: true}
        return await ReviewsEntity.findAll(filter);
    }

    static async FindOneReviewById(id: number) {

    }

    static async FindAllReviewsByIdProduct(id: number) {

    }
};
