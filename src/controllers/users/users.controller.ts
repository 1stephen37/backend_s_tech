import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import Users from "../../entities/users/users.entity";
import {createToken} from "../../libraries/Token.library";
import {comparePassword, hashPassword} from "../../libraries/HashPassword.library";
import UsersService from "../../services/users/users.service";
import {auth} from "../../middlewares/auth.middleware";

const UsersController = Router();

UsersController.get('', auth, async (req: Request, res: Response) => {
    try {
        const offset = req.query.offset;
        const limit = req.query.limit;
        let filter: {
            where?: { id_brand?: string, name?: {} },
            offset?: number,
            limit?: number,
            order?: [[string, string]]
        } = {};
        if (offset) filter.offset = parseInt(offset as string);
        if (limit) filter.limit = parseInt(limit as string);
        const usersList = await UsersService.findAllUsers(filter, ['name', 'id_user', 'image', 'address',
            'phone', 'role', 'email']);
        res.status(HttpStatus.SUCCESS).json({
            data: usersList
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

UsersController.post('/sign-in', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const userOnSystem = await UsersService.findUserByEmail(user.email);
        if (!userOnSystem) {
            res.status(HttpStatus.NOT_FOUND).json({error: "Email không tồn tại trên hệ thống"})
        }
        let isPasswordCorrect;
        if (userOnSystem) {
            isPasswordCorrect = await comparePassword(user.password, userOnSystem.password);
            if (!isPasswordCorrect) res.status(HttpStatus.UNAUTHORIZED).json({error: "Mật khẩu không đúng"})
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
                        address: userOnSystem.address,
                        phone: userOnSystem.phone,
                        email: userOnSystem.email
                    }
                })
            }
        }
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

UsersController.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const userOnSystem = await UsersService.findUserByEmail(user.email);
        if (userOnSystem) res.status(HttpStatus.UNAUTHORIZED).json({error: "Email đã tồn tại trên hệ thống"});
        else {
            user.password = await hashPassword(user.password);
            const newUser = await Users.create(user, {returning: true, raw: true});
            const accessToken = createToken(newUser.id_user, newUser.role, 15 * 60 * 60);
            const refreshToken = createToken(newUser.id_user, newUser.role, 60 * 60 * 60);
            res.status(HttpStatus.SUCCESS).json({
                data: {
                    id_user: newUser.id_user,
                    name: newUser.name,
                    image: newUser.image,
                    role: newUser.role,
                    address: newUser.address,
                    phone: newUser.phone,
                    email: newUser.email,
                    accessToken,
                    refreshToken
                }
            })
        }
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

UsersController.post('/google', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const userOnSystem = await UsersService.findUserByEmail(user.email);
        if (userOnSystem) {
            if (userOnSystem.password === "") {
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
                        address: userOnSystem.address,
                        phone: userOnSystem.phone,
                        email: userOnSystem.email
                    }
                });
            } else {
                res.status(HttpStatus.CONFLICT).json({error: "Bạn đã đăng kí bằng email và mật khẩu trước đó"})
            }
        } else {
            const newUser = await UsersService.createUser(user);
            let accessToken = createToken(newUser.id_user, newUser.role, 15 * 60 * 60)
            let refreshToken = createToken(newUser.id_user, newUser.role, 30 * 60 * 60)
            res.status(HttpStatus.SUCCESS).json({
                data: {
                    accessToken,
                    refreshToken,
                    id_user: newUser.id_user,
                    name: newUser.name,
                    image: newUser.image,
                    role: newUser.role,
                    address: newUser.address,
                    phone: newUser.phone,
                    email: newUser.email
                }
            });
        }
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

UsersController.get('/:id', auth, async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = UsersService.findUsersById(id);
        res.status(HttpStatus.SUCCESS).json({
            data: user
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default UsersController;
