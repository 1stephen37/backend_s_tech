import {Model, DataTypes, INTEGER, STRING, BOOLEAN} from 'sequelize';
import sequelize from '../../sequelize';

class Banners extends Model {
    public id_banner!: string;
    public id_product!: string;
    public slogan!: string;
    public image!: string;
    public description!: string;
    public status!: number;
    public created_at!: string | Date;
    public updated_at!: string | Date;
}

Banners.init(
    {
        id_voucher: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_product: {
            type: INTEGER,
            references: {
                model: 'products',
                key: 'id_product',
            },
        },
        code: {
            type: STRING,
            allowNull: false,
        },
        discount: {
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
        modelName: 'Banners',
        tableName: 'banners',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Banners;
