import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface BookAttributes {
    id: number;
    name: string;
    score: number;
}

interface BorrowCreationAttributes extends Optional<BookAttributes, 'id' | 'score'> {}

class Book extends Model<BookAttributes, BorrowCreationAttributes> implements BookAttributes {
    public id!: number;
    public name!: string;
    public score!: number;
}

// Model tanımı
Book.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    score: {
        type: DataTypes.FLOAT,
        defaultValue: -1, // Skor verilmemişse varsayılan -1
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'books',
    timestamps: false,
});

export default Book;
