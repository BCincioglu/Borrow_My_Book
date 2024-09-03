import User from '../models/user';
import Borrow from '../models/borrow';
import Book from '../models/book';
import { Op } from 'sequelize';

export const getUsersService = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        throw new Error("An error occurred while fetching users.");
    }
};

export const getUserByIdService = async (userId: number) => {
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Past Books
        const pastBooks = await Borrow.findAll({
            where: {
                userId: userId,
                returnedAt: {
                    [Op.not]: null
                }
            },
            include: [{ model: Book, as: 'Book', attributes: ['name'] }]
        });

        // Present Books
        const presentBooks = await Borrow.findAll({
            where: {
                userId: userId,
                returnedAt: null
            },
            include: [{ model: Book, as: 'Book', attributes: ['name'] }]
        });

        const pastBooksFormatted = pastBooks.map(borrow => ({
            name: borrow.Book?.name,  
            userScore: borrow.score
        }));

        const presentBooksFormatted = presentBooks.map(borrow => ({
            name: borrow.Book?.name
        }));

        return {
            id: user.id,
            name: user.name,
            books: {
                past: pastBooksFormatted,
                present: presentBooksFormatted
            }
        };
    } catch (error) {
        throw new Error(`Error fetching user with ID ${userId}: ${error}`);
    }
};

export const createUserService = async (name: string) => {
    try {
        return await User.create({ name });
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("An error occurred while creating the user.");
    }
};
