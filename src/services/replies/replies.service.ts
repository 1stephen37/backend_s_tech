import Replies from "../../entities/replies/replies.entity";

export default class RepliesService {
    static async FindAllReviews(filter : {}) {

    }

    static async FindOneReviewById(id: number) {

    }

    static async FindAllRepliesByIdReview(id_review: string, attributes? : string[]) {
        return await Replies.findAll({
            where: {
                id_review: id_review
            },
            raw : true,
            attributes
        })
    }
};
