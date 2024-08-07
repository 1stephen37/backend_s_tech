import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class Deliveries extends Model {
    public id_delivery!: string;
    public name!: string;
    public price!: number;
    public speed!: string;
    public status!: number;
    public created_at!: string | Date;
    public updated_at!: string | Date;
}

Deliveries.init(
    {
        id_delivery: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: STRING,
            allowNull: false,
        },
        price: {
            type: INTEGER,
            allowNull: false,
        },
        speed: {
            type: STRING,
            allowNull: false,
        },
        status: {
            type: INTEGER,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Deliveries',
        tableName: 'deliveries',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Deliveries;
