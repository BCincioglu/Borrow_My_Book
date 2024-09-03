import Borrow from '../models/borrow';
import { Op } from 'sequelize';

// Kitap ödünç almak için servis fonksiyonu
export const borrowBook = async (userId: number, bookId: number) => {
    try {
        // Bir Borrow kaydı oluşturuyoruz
        return await Borrow.create({ userId, bookId });
    } catch (error) {
        throw new Error(`Error borrowing book: ${error}`);
    }
};

export const returnBook = async (userId: number, bookId: number, returnedAt?: Date, score?: number) => {
    try {
        // Kullanıcı ve kitap ID'sine göre ve `returnedAt` değeri null olan bir kayıt buluyoruz
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

        // Kaydı güncelliyoruz
        await borrow.update({
            returnedAt: returnedAt || new Date(), // Eğer `returnedAt` belirtilmemişse mevcut tarihi kullan
            score // Opsiyonel skor
        });

        return borrow;
    } catch (error) {
        throw new Error(`Error returning book: ${error}`);
    }
};
