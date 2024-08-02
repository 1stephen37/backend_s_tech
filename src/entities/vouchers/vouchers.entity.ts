import {Model, DataTypes, INTEGER, STRING, BOOLEAN} from 'sequelize';
import sequelize from '../../sequelize';

class Vouchers extends Model {
    public id_voucher!: string;
    public code!: string;
    public discount!: number;
    public max_discount!: number;
    public min_amount!: number;
    public is_percent!: boolean;
    public expired!: boolean;
    public end_date!: string | Date;
    public created_at!: string | Date;
    public updated_at!: string | Date;
}

Vouchers.init(
    {
        id_voucher: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: STRING,
            allowNull: false,
        },
        discount: {
            type: INTEGER,
            allowNull: true,
        },
        max_discount: {
            type: INTEGER,
            allowNull: false,
        },
        min_amount: {
            type: INTEGER
        },
        is_percent: {
            type: BOOLEAN
        },
        expired: {
            type: BOOLEAN,
            allowNull: true,
        },
        end_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
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
        modelName: 'Vouchers',
        tableName: 'vouchers',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    }
);

export default Vouchers;
