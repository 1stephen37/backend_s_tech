import {Model, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class BrandsEntity extends Model {
    public id_brand!: string;
    public name!: string;
    public logo!: string;
    public status!: number;
    public count?: number;
}

BrandsEntity.init(
    {
        id_brand: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        logo: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BrandsEntity',
        tableName: 'brands',
        timestamps: false,
    }
);

export default BrandsEntity;
