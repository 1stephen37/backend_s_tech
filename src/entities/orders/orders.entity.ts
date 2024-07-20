import {Model, DataTypes, INTEGER, STRING, FLOAT} from 'sequelize';
import sequelize from '../../sequelize';

class Orders extends Model {
    public id_order!: string;
    public id_delivery!: string;
    public id_user!: string;
    public voucher_code!: string;
    public phone!: string;
    public name!: string;
    public address!: string;
    public status!: number;
    public distance!: number;
    public ship_fee!: number;
    public origin_total!: number;
    public total!: number;
    public image!: string;
    public created_at!: string | Date;
    public updated_at!: string | Date;
}

Orders.init(
    {
        id_order: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_delivery: {
            type: INTEGER,
            references: {
                model: 'deliveries', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_delivery', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_user: {
            type: INTEGER,
            references: {
                model: 'users', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_user', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        voucher_code: {
            type: STRING,
            allowNull: false,
        },
        phone: {
            type: STRING,
            allowNull: false,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        address: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: false,
        },
        distance: {
            type: FLOAT,
            allowNull: false,
        },
        ship_fee: {
            type: INTEGER,
            allowNull: false,
        },
        origin_total: {
            type: INTEGER,
            allowNull: false,
        },
        total: {
            type: INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Orders',
        tableName: 'orders',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Orders;
