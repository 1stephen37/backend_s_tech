import {Model, DataTypes, INTEGER, STRING, BOOLEAN} from 'sequelize';
import sequelize from '../../sequelize';

class Shop extends Model {
    public id_shop!: string;
    public name!: string;
    public address!: string;
    public email!: string;
    public phone!: string;
    public status!: number;
}

Shop.init(
    {
        id_shop: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        address: {
            type: STRING,
            allowNull: true,
        },
        email: {
            type: STRING,
            allowNull: true,
        },
        phone: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Shop',
        tableName: 'shop',
        timestamps: false
    }
);

export default Shop;
