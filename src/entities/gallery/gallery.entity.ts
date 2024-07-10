import {Model, INTEGER, STRING, BOOLEAN} from 'sequelize';
import sequelize from '../../sequelize';

class Gallery extends Model {
    public id_gallery!: number;
    public id_product!: number;
    public url!: string;
    public is_primary!: boolean;
}

Gallery.init(
    {
        id_gallery: {
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
        url: {
            type: STRING,
            allowNull: false,
        },
        is_primary: {
            type: BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Gallery',
        tableName: 'gallery',
        timestamps: false,
    }
);

export default Gallery;
