import express, {Request, Response, Router} from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import path from "path";
import morgan from "morgan";
import categoriesController from './controllers/categories/categories.controller'
import environment from "./constant";

const app = express();

app.use(cors());

app.use(express.static(path.join(path.resolve(__dirname, '../'), 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req : Request, res : Response) => {
    res.send('Hello this is my website api of stephen Nguyen (aka37)');
});

const apiRouter: Router = express.Router();

apiRouter.use('/categories', categoriesController)
app.use('/api/v1', apiRouter);

app.listen(environment.port, () => {
    console.log(`Server is listening on port ${environment.port}`);
});
