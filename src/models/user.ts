import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});

export default User;
