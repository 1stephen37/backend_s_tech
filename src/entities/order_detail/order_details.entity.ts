import {Model, DataTypes, INTEGER, STRING, FLOAT, NUMBER} from 'sequelize';
import sequelize from '../../sequelize';

class OrderDetails extends Model {
    public id_order_detail!: string;
    public id_order!: string;
    public id_product!: string;
    public origin_price!: number;
    public sale_price!: number;
    public memory!: string;
    public color!: string;
    public quantity!: string;
}

OrderDetails.init(
    {
        id_order_detail: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_order: {
            type: INTEGER,
            references: {
                model: 'orders', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_order', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'products', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_product', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        origin_price: {
            type: INTEGER,
            allowNull: false,
        },
        sale_price: {
            type: INTEGER,
            allowNull: false,
        },
        memory: {
            type: STRING,
            allowNull: false,
        },
        color: {
            type: STRING,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'OrderDetails',
        tableName: 'order_details',
        timestamps: false,
    }
);

export default OrderDetails;
