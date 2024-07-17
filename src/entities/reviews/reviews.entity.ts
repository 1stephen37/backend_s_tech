import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class Reviews extends Model {
    public id_review!: string;
    public id_product!: string;
    public id_user!: string;
    public name!: string;
    public avatar!: string;
    public content!: string;
    public createdAt!: string;
    public updatedAt!: string;
    public replies!: {
        name: string;
        avatar: string;
        content: string;
    }[];
}

Reviews.init(
    {
        id_review: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_user: {
            type: INTEGER,
            references: {
                model: 'users', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_user', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'products', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_product', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        content: {
            type: STRING,
            allowNull: false,
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
        modelName: 'Reviews',
        tableName: 'reviews',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Reviews;
