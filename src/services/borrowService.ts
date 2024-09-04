import Borrow from '../models/borrow';
import { Op } from 'sequelize';

export const borrowBookService = async (userId: number, bookId: number) => {
    try {
        return await Borrow.create({ userId, bookId });
    } catch (error) {
        throw new Error(`Error borrowing book: ${error}`);
    }
};

export const returnBookService = async (userId: number, bookId: number, returnedAt?: Date, score?: number) => {
    try {
        const borrow = await Borrow.findOne({
            where: {
                userId,
                bookId,
                returnedAt: {
                    [Op.is]: null
                }
            }
        });

        if (!borrow) {
            throw new Error('Borrow record not found or book already returned');
        }

        await borrow.update({
            returnedAt: returnedAt || new Date(),
            score
        });

        return borrow;
    } catch (error) {
        throw new Error(`Error returning book: ${error}`);
    }
};
