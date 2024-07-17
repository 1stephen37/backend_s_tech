import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class SpecificationCategory extends Model {
    public id_specification_category!: string;
    public id_product!: string;
    public name!: string;
    public detail: {
        name: string;
        value: string
    }[] = [];
}

SpecificationCategory.init(
    {
        id_specification_category: {
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
        name: {
            type: STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'SpecificationCategory',
        tableName: 'specification_category',
        timestamps: false,
    }
);

export default SpecificationCategory;
