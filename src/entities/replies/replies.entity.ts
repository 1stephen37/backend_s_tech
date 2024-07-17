import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class Replies extends Model {
    public id_reply!: string;
    public id_review!: string;
    public id_user!: string;
    public name!: string;
    public avatar!: string;
    public content!: string;
    public createdAt!: string;
    public updatedAt!: string;
}

Replies.init(
    {
        id_reply: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_review: {
            type: INTEGER,
            references: {
                model: 'reviews', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_review', // Tên cột trong bảng categories mà bạn muốn liên kết đến
            },
        },
        id_user: {
            type: INTEGER,
            references: {
                model: 'users', // Tên bảng mà bạn muốn liên kết đến
                key: 'id_user', // Tên cột trong bảng categories mà bạn muốn liên kết đến
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
        modelName: 'Replies',
        tableName: 'replies',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Replies;
