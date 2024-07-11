import {Model, DataTypes, INTEGER, STRING} from 'sequelize';
import sequelize from '../../sequelize';

class ProductDetails extends Model {
    public id_product_detail!: string;
    public id_product!: string;
    public screen_size!: string;
    public screen_technology!: string;
    public resolution!: string;
    public screen_feature!: string;
    public refresh_rate!: string;
    public screen_type!: string;
    public rear_camera!: string;
    public rear_video!: string;
    public camera_features!: string;
    public front_camera!: string;
    public front_media!: string;
    public chipset!: string;
    public cpu!: string;
    public gpu!: string;
    public memory_card_slot!: string;
    public battery!: string;
    public charging_technology!: string;
    public charging_port!: string;
    public sim!: string;
    public os!: string;
    public nfc!: boolean;
    public network_support!: string;
    public wifi!: string;
    public bluetooth!: string;
    public gps!: string;
    public size!: string;
    public weight!: number;
    public back_material!: string;
    public frame_material!: string;
    public ingress_protection!: string;
    public technology_utilities!: string;
    public types_of_sensors!: string;
    public special_features!: string;
    public description!: string;
}

ProductDetails.init(
    {
        id_product_detail: {
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
        screen_size: {
            type: STRING,
            allowNull: true
        },
        screen_technology: {
            type: STRING,
            allowNull: true
        },
        resolution: {
            type: STRING,
            allowNull: true
        },
        screen_feature: {
            type: STRING,
            allowNull: true
        },
        refresh_rate: {
            type: STRING,
            allowNull: true
        },
        screen_type: {
            type: STRING,
            allowNull: true
        },
        rear_camera: {
            type: STRING,
            allowNull: true
        },
        rear_video: {
            type: STRING,
            allowNull: true
        },
        camera_features: {
            type: STRING,
            allowNull: true
        },
        front_camera: {
            type: STRING,
            allowNull: true
        },
        front_media: {
            type: STRING,
            allowNull: true
        },
        chipset: {
            type: STRING,
            allowNull: true
        },
        cpu: {
            type: STRING,
            allowNull: true
        },
        gpu: {
            type: STRING,
            allowNull: true
        },
        memory_card_slot: {
            type: STRING,
            allowNull: true
        },
        battery: {
            type: STRING,
            allowNull: true
        },
        charging_technology: {
            type: STRING,
            allowNull: true
        },
        charging_port: {
            type: STRING,
            allowNull: true
        },
        sim: {
            type: STRING,
            allowNull: true
        },
        os: {
            type: STRING,
            allowNull: true
        },
        nfc: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        network_support: {
            type: STRING,
            allowNull: true
        },
        wifi: {
            type: STRING,
            allowNull: true
        },
        bluetooth: {
            type: STRING,
            allowNull: true
        },
        gps: {
            type: STRING,
            allowNull: true
        },
        size: {
            type: STRING,
            allowNull: true
        },
        weight: {
            type: INTEGER,
            allowNull: true
        },
        back_material: {
            type: STRING,
            allowNull: true
        },
        frame_material: {
            type: STRING,
            allowNull: true
        },
        ingress_protection: {
            type: STRING,
            allowNull: true
        },
        technology_utilities: {
            type: STRING,
            allowNull: true
        },
        types_of_sensors: {
            type: STRING,
            allowNull: true
        },
        special_features: {
            type: STRING,
            allowNull: true
        },
        description: {
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
