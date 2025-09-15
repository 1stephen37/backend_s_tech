import {Router, Request, Response} from "express";
import {HttpStatus} from "../../constants";
import OrdersService from "../../services/orders/orders.service";
import OrderDetailsService from "../../services/orderDetails/orderDetails.service";
import {Op} from "sequelize";

const DashboardController = Router();

DashboardController.get('/', async (req: Request, res: Response) => {
    try {
        res.status(HttpStatus.SUCCESS).json({
            data: '1'
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

DashboardController.get('/statistical', async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1); // ngày 1 tháng này
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1); // ngày 1 tháng sau

        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); // ngày 1 tháng trước
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 1); // ngày 1 tháng này (kết thúc tháng trước)

        const ordersThisMonth = await OrdersService.findAllOrders({
            where: {
                status: 1,
                created_at: {
                    [Op.gte]: startOfThisMonth,
                    [Op.lt]: startOfNextMonth
                }
            },
            // include: [
            //     {
            //         model: OrderDetails,
            //         as: "orderDetails",
            //         attributes: ["quantity"],
            //     },
            // ],
        });

        const revenueThisMonth = ordersThisMonth.reduce((sum, order) => sum + Number(order.total || 0), 0);

        const ordersLastMonth = await OrdersService.findAllOrders({
            where: {
                status: 1,
                created_at: {
                    [Op.gte]: startOfLastMonth,
                    [Op.lt]: endOfLastMonth
                }
            }
        });

        const revenueLastMonth = ordersLastMonth.reduce((sum, order) => sum + Number(order.total || 0), 0);

        let growthPercent = 0;
        if (revenueLastMonth > 0) {
            growthPercent = ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
        }

        if (growthPercent > 0) {
            growthPercent = Number(growthPercent.toFixed(1));
        }

        // const orderDetailsList = await OrderDetailsService.findOrderDetailWithFiler({
        //     where: {
        //         id_order
        //     }
        // });

        const data = {
            totalRevenue: revenueThisMonth,
            sales: 2350,
            orders: 12234,
            activeNow: 573,
            compare: {
                revenue: growthPercent,
                subscriptions: "+1801% from last month",
                sales: "+19% from last month",
                activeNow: "+201 since last hour"
            }
        };
        res.status(HttpStatus.SUCCESS).json({
            data: data
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

DashboardController.get('/revenue', async (req: Request, res: Response) => {
    try {
        res.status(HttpStatus.SUCCESS).json({
            data: '1'
        })
    } catch (error: Error | any) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: error.message});
    }
})

export default DashboardController;
