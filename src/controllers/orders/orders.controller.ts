import {Request, Response, Router} from "express";
import {HttpStatus} from "../../constants";
import {auth} from "../../middlewares/auth.middleware";
import OrdersService from "../../services/orders/orders.service";
import OrderDetailsService from "../../services/orderDetails/orderDetails.service";
import UsersService from "../../services/users/users.service";

const ordersController = Router();

ordersController.get('', auth, async (req: Request, res: Response) => {
    try {
        const orderList = await OrdersService.findAllOrders();
        res.status(HttpStatus.SUCCESS).json({
            data: orderList
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

ordersController.post('/create', async (req: Request, res: Response) => {
    try {
        const order = req.body.order;
        const orderDetails = req.body.orderDetails;

        order.id_user = await UsersService.findUserByEmail(order.email, ['id_user'])

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
                data: 'Đơn hàng của bạn đang được xử lý'
            })
        }

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

ordersController.post('/create/guest', async (req: Request, res: Response) => {
    try {
        const order = req.body.order;
        const orderDetails = req.body.orderDetails;
        const newUser = await UsersService.createUser({
            name: order.name,
            email: order.email,
            address: order.address
        })

        order.id_user = newUser.id_user;
        const newOrder = await OrdersService.CreateOrder(order);
        let newOrderDetails = [];
        if (newOrder) {
            for (const index in orderDetails) {
                newOrderDetails.push(await OrderDetailsService.createOrderDetails(orderDetails[index]));
            }
        }
        if (newOrder && newOrderDetails.length > 0) {
            res.status(HttpStatus.SUCCESS).json({
                data: 'Đơn hàng của bạn đang được xử lý'
            })
        }

    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message})
    }
})

export default ordersController;
