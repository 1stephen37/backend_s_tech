import express, {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";
import morgan from "morgan";
import BrandsController from './controllers/brands/brands.controller'
import {environment} from "./constants";
import sequelize from "./sequelize";
import brandsController from "./controllers/brands/brands.controller";

const app = express();

app.use(cors());

app.use(express.static(path.join(path.resolve(__dirname, '../'), 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })

app.get('/', (req : Request, res : Response) => {
    res.send('Hello this is my website api of stephen Nguyen (aka37)');
});

const apiRouter: Router = express.Router();

apiRouter.use('/brands', brandsController)
app.use('/api/v1', apiRouter);

app.listen(environment.port, () => {
    console.log(`Server is listening on port ${environment.port}`);
});
