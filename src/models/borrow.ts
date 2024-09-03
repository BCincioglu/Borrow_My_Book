import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Book from './book';

interface BorrowAttributes {
    id: number;
    userId: number;
    bookId: number;
    borrowedAt: Date;
    returnedAt?: Date | null;
    score?: number | null;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id' | 'borrowedAt' | 'returnedAt' | 'score'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
    public id!: number;
    public userId!: number;
    public bookId!: number;
    public borrowedAt!: Date;
    public returnedAt?: Date;
    public score?: number;

    public readonly Book?: Book;
    public readonly averageScore?: number;
}

Borrow.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false,
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'books',
            key: 'id',
        },
        allowNull: false,
    },
    borrowedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    returnedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    score: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    tableName: 'borrows',
    timestamps: false,
});

Borrow.belongsTo(Book, { foreignKey: 'bookId', as: 'Book' });

export default Borrow;
