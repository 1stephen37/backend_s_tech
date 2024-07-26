import UsersEntity from "../../entities/users/users.entity";

export default class UsersService {
    static async findUsersById(id_user: string, attributes?: string[]) {
        return await UsersEntity.findByPk(id_user, {
            raw: true,
            attributes: attributes
        })
    }

    static async findAllUsers(filter?: {}, attributes?: string[]) {
        if (filter) filter = {...filter, raw: true, attributes: attributes};
        else {
            filter = {raw: true, attributes: attributes}
        }
        return await UsersEntity.findAll(filter);
    }

    static async findUserByEmail(email: string) {
        return await UsersEntity.findOne({
            where: {
                email: email
            },
            raw: true
        })
    }

    static async createUser(user: {}) {
        return await UsersEntity.create(user, {
            returning: true,
            raw: true
        })
    }
}
