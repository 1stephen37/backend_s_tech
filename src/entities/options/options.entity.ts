import {Model, BOOLEAN, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class Options extends Model {
    public id_option!: string;
    public id_product!: string;
    public color!: string;
    public price!: number;
    public quantity!: number;
    public memory! : string;
    public is_basic! : boolean;
}

Options.init(
    {
        id_option: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'products', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_product', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        color: {
            type: STRING,
            allowNull: false,
        },
        price: {
            type: INTEGER,
            allowNull: false,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
        },
        memory: {
            type: STRING,
            allowNull: false,
        },
        is_basic: {
            type: BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Options',
        tableName: 'options',
        timestamps: false,
    }
);

export default Options;
