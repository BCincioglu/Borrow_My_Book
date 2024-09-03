import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Borrow from './borrow';

interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}


class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;

    // İlişkiler
    public readonly borrowedBooks?: Borrow[];
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
});

export default User;
