import { Sequelize } from 'sequelize';
import {environment} from "./constants";

const sequelize = new Sequelize(environment.DB_NAME, environment.DB_USER, environment.DB_PASSWORD, {
    port: environment.DB_PORT,
    host: environment.DB_HOST,
    dialect: 'postgres',
    logging: false
});

export default sequelize;
