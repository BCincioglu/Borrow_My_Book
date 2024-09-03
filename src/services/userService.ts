import User from '../models/user';
import Borrow from '../models/borrow';
import Book from '../models/book';
import { Op } from 'sequelize';

export const getUsersService = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        // console.error("Error fetching users:", error);
        throw new Error("An error occurred while fetching users.");
    }
};

export const getUserByIdService = async (userId: number) => {
    try {
        // Kullanıcıyı al
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Kullanıcının geçmişte ödünç aldığı kitapları al
        const pastBooks = await Borrow.findAll({
            where: {
                userId: userId,
                returnedAt: {
                    [Op.not]: null
                }
            },
            include: [{ model: Book, as: 'Book', attributes: ['name'] }]
        });

        // Kullanıcının şu anda ödünç aldığı kitapları al
        const presentBooks = await Borrow.findAll({
            where: {
                userId: userId,
                returnedAt: null
            },
            include: [{ model: Book, as: 'Book', attributes: ['name'] }]
        });

        // Geçmiş kitapları ve puanları formatlayın
        const pastBooksFormatted = pastBooks.map(borrow => ({
            name: borrow.Book?.name,  // Kitap adını al
            userScore: borrow.score   // Kullanıcının verdiği puanı al
        }));

        // Şu anda ödünç alınan kitapları formatlayın
        const presentBooksFormatted = presentBooks.map(borrow => ({
            name: borrow.Book?.name  // Kitap adını al
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
