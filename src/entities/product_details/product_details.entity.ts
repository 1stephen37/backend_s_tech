import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class ProductDetails extends Model {
    public id_product_detail!: string;
    public id_specification_category!: string;
    public name!: string;
    public value!: string;
}

ProductDetails.init(
    {
        id_product_detail: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_specification_category: {
            type: INTEGER,
            references: {
                model: ' specification_category', // Tên bảng mà bạn muốn liên kết đến
                key: ' id_specification_category', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        name: {
            type: STRING,
            allowNull: true
        },
        value: {
            type: STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: 'ProductDetails',
        tableName: 'product_details',
        timestamps: false
    }
);

export default ProductDetails;
