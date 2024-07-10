import {Router, Request, Response} from 'express';
import {HttpStatus} from "../../constants";
import Users from "../../entities/users/users.entity";
import {createToken} from "../../libraries/Token.library";
import {hashPassword} from "../../libraries/HashPassword.library";

const UsersController = Router();

UsersController.get('', async (req : Request, res : Response) => {
    try {
        res.send('user')
    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.post('/sign-in', async (req : Request, res : Response) => {
    try {
        const user = req.body;
        console.log(user);
        res.status(HttpStatus.SUCCESS).json(user)
    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.post('/sign-up', async (req : Request, res : Response) => {
    try {
        const user = req.body;
        user.password = await hashPassword(user.password);
        const newUser = await Users.create(user, { returning : true, raw : true});
        console.log(newUser)
        const accessToken = createToken(newUser.id_user, newUser.role,  60 * 60);
        const refreshToken = createToken(newUser.id_user, newUser.role, 60 * 60 * 60);
        res.status(HttpStatus.SUCCESS).json({
            data: {
                id_user: newUser.id_user,
                name: newUser.id_user,
                accessToken,
                refreshToken
            }
        })
    } catch (error : Error | any) {
        console.log(error.message)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

UsersController.get('', async (req : Request, res : Response) => {
    try {

    } catch (error : Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
})

export default UsersController;
