import {Request, Response, Router} from "express";
import {HttpStatus} from "../../constants";
import {auth, authAdmin} from "../../middlewares/auth.middleware";
import OrdersService from "../../services/orders/orders.service";
import OrderDetailsService from "../../services/orderDetails/orderDetails.service";
import UsersService from "../../services/users/users.service";
import {hashPassword} from "../../libraries/HashPassword.library";
import Products from "../../entities/products/products.entity";
import ProductService from "../../services/products/products.service";
import {Op} from "sequelize";

const ordersController = Router();

ordersController.get('', auth, async (req: Request, res: Response) => {
    try {
        const offset = req.query.offset;
        const limit = req.query.limit;
        const id_user = req.query.id_user;
        let filter: {
            where?: { id_brand?: string, name?: {}, id_user: string },
            offset?: number,
            limit?: number,
            order?: [[string, string]]
        } = {};
        if (offset) filter.offset = parseInt(offset as string);
        if (limit) filter.limit = parseInt(limit as string);
        if (id_user) {
            console.log(id_user);
            if (filter.where) {
                filter.where.id_user = id_user.toString();
            } else {
                filter.where = {
                    id_user: id_user.toString()
                };
            }
        }
        let orderList = await OrdersService.findAllOrders(filter);
        // console.log(orderList)
        for (let index in orderList) {
            let [user, details] = await Promise.all([
                await UsersService.findUsersById(orderList[index].id_user),
                await OrderDetailsService.findOrderDetailsByOrder(orderList[index].id_order, ['id_product', 'origin_price', 'sale_price', 'memory', 'color', 'quantity'])
            ]);
            if (user) {
                orderList[index].avatar = user.image;
            }
            if (details) {
                for (let index in details) {
                    let product = await ProductService.getOneProductPyPk(details[index].id_product, ['name']);
                    if (product) details[index].product_name = product.name;
                }
                orderList[index].details = details
            }
        }

        res.status(HttpStatus.SUCCESS).json({
            data: orderList
        })
    } catch (error: Error | any) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

ordersController.post('/create', async (req: Request, res: Response) => {
    try {
        const order = req.body.order;
        const orderDetails = req.body.orderDetails;

        const user = await UsersService.findUserByEmail(order.email, ['id_user']);
        if (user) {
            order.id_user = user.id_user;
            const newOrder = await OrdersService.CreateOrder(order);
            let newOrderDetails = [];
            if (newOrder) {
                for (const index in orderDetails) {
                    orderDetails[index].id_order = newOrder.id_order;
                    newOrderDetails.push(await OrderDetailsService.createOrderDetails(orderDetails[index]));
                }
            }
            if (newOrder && newOrderDetails.length > 0) {
                res.status(HttpStatus.SUCCESS).json({
                    message: 'Đơn hàng của bạn đang được xử lý'
                })
            }
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                error: "Không tìm thấy user trên hệ thống"
            })
        }


    } catch (error: Error | any) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

ordersController.post('/create/guest', async (req: Request, res: Response) => {
    try {
        const order = req.body.order;
        const orderDetails = req.body.orderDetails;

        let user = await UsersService.findUserByEmail(order.email);

        if (!user) {
            let password = await hashPassword('Guest@123');
            user = await UsersService.createUser({
                name: order.name,
                email: order.email,
                phone: order.phone,
                address: order.address,
                password
            })
        }

        if (user) {
            order.id_user = user.id_user;
            const newOrder = await OrdersService.CreateOrder(order);
            let newOrderDetails = [];
            if (newOrder) {
                for (const index in orderDetails) {
                    orderDetails[index].id_order = newOrder.id_order;
                    newOrderDetails.push(await OrderDetailsService.createOrderDetails(orderDetails[index]));
                }
            }
            if (newOrder && newOrderDetails.length > 0) {
                res.status(HttpStatus.SUCCESS).json({
                    message: 'Đơn hàng của bạn đang được xử lý'
                })
            }
        } else {
            res.status(HttpStatus.NOT_FOUND).json({
                error: "Không tìm thấy user trên hệ thống"
            })
        }


    } catch (error: Error | any) {
        console.log(error)
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

ordersController.post('/update/:id', authAdmin, async (req: Request, res: Response) => {
    try {
        const id_order = req.params.id;

    } catch (err: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: err.message})
    }
})

ordersController.post('/update/status/:id', authAdmin, async (req: Request, res: Response) => {
    try {
        const id_order = req.params.id;
        const status = req.body.status;
        if(status === 0) {

        } else if(status === 1) {

        } else if(status === 2) {

        } else if(status === 3) {

        } else if(status === 4) {

        }

    } catch (err: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({err: err.message})
    }
})

export default ordersController;
