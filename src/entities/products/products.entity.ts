import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class Products extends Model {
    public id_product!: string;
    public id_brand!: string;
    public name!: string;
    public sale_off!: number;
    public views!: number;
    public status!: number;
    public image!: string;
    public created_at!: string | Date;
    public updated_at!: string | Date;
    public memory!: string;
    public color!: string;
    public price!: number;
    public options!: object[];
    public details!: {}[];
    public brand_name!: string;
}

Products.init(
    {
        id_product: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_brand: {
            type: INTEGER,
            references: {
                model: 'brands', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_brand', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        sale_off: {
            type: INTEGER,
            allowNull: false,
        },
        views: {
            type: INTEGER,
            allowNull: true,
        },
        status: {
            type: INTEGER,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Products',
        tableName: 'products',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Products;
