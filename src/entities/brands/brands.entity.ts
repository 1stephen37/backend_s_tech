import {Model, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class BrandsEntity extends Model {
    public id_brand!: number;
    public name!: string;
    public description!: number;
    public logo!: string;
    public status!: number;
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
        description: {
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
