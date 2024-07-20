import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import Users from "../../entities/users/users.entity";
import {createToken} from "../../libraries/Token.library";
import {comparePassword, hashPassword} from "../../libraries/HashPassword.library";
import UsersService from "../../services/users/users.service";

const UsersController = Router();

UsersController.get('', async (req: Request, res: Response) => {
    try {
        let filter: {} = {};
        const usersList = await UsersService.findAllUsers(filter, ['name', 'id_user', 'image', 'address',
            'phone', 'role', 'created_at', 'updated_at']);
        res.status(HttpStatus.SUCCESS).json({
            data: usersList
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.post('/sign-in', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const userOnSystem = await UsersService.findUserByEmail(user.email);
        if (!userOnSystem) {
            res.status(HttpStatus.NOT_FOUND).json({message: "Email không tồn tại trên hệ thống"})
        }
        let isPasswordCorrect;
        if (userOnSystem) {
            isPasswordCorrect = await comparePassword(user.password, userOnSystem.password);
            if (!isPasswordCorrect) res.status(HttpStatus.UNAUTHORIZED).json({message: "Mật khẩu không đúng"})
            else {
                let accessToken = createToken(userOnSystem.id_user, userOnSystem.role, 15 * 60 * 60)
                let refreshToken = createToken(userOnSystem.id_user, userOnSystem.role, 30 * 60 * 60)
                res.status(HttpStatus.SUCCESS).json({
                    data: {
                        accessToken,
                        refreshToken,
                        id_user: userOnSystem.id_user,
                        name: userOnSystem.name,
                        image: userOnSystem.image,
                        role: userOnSystem.role,
                    }
                })
            }
        }
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        user.password = await hashPassword(user.password);
        const newUser = await Users.create(user, {returning: true, raw: true});
        console.log(newUser)
        const accessToken = createToken(newUser.id_user, newUser.role, 60 * 60);
        const refreshToken = createToken(newUser.id_user, newUser.role, 60 * 60 * 60);
        res.status(HttpStatus.SUCCESS).json({
            data: {
                id_user: newUser.id_user,
                name: newUser.id_user,
                image: newUser.image,
                role: newUser.role,
                accessToken,
                refreshToken
            }
        })
    } catch (error: Error | any) {
        console.log(error.message)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.get('', async (req: Request, res: Response) => {
    try {

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default UsersController;
