import express, {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";
import morgan from "morgan";
import {environment} from "./constants";
import sequelize from "./sequelize";
import BrandsController from "./controllers/brands/brands.controller";
import ReviewsController from "./controllers/reviews/reviews.controller";
import ProductsController from "./controllers/products/products.controller";
import OrdersController from "./controllers/orders/orders.controller";
import Order_detailsController from "./controllers/orderDetails/order_details.controller";
import UsersController from "./controllers/users/users.controller";
import DeliveriesController from "./controllers/deliveries/deliveries.controller";
import vouchersController from "./controllers/vouchers/vouchers.controller";
import ShopController from "./controllers/shop/shop.controller";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(express.static(path.join(path.resolve(__dirname, '../'), 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })

app.get('/', (req: Request, res: Response) => {
    res.send(`
        <h1 style="text-align: center; font-size: 30px; margin-top: 50px">Đây là Website backend Stech api của Nguyễn Tiến (Stephen Nguyễn)</h1>
    `);
});

const apiRouter: Router = express.Router();

apiRouter.use('/shop', ShopController);
apiRouter.use('/vouchers', vouchersController);
apiRouter.use('/brands', BrandsController);
apiRouter.use('/deliveries', DeliveriesController);
apiRouter.use('/users', UsersController);
apiRouter.use('/reviews', ReviewsController);
apiRouter.use('/products', ProductsController);
apiRouter.use('/orders', OrdersController);
apiRouter.use('/order_details', Order_detailsController);
app.use('/api/v1', apiRouter);

app.listen(environment.port, () => {
    console.log(`Server is listening on port ${environment.port}`);
});
