import Borrow from '../models/borrow';

// Kitap ödünç almak için servis fonksiyonu
export const borrowBook = async (userId: number, bookId: number) => {
    try {
        // Bir Borrow kaydı oluşturuyoruz
        return await Borrow.create({ userId, bookId });
    } catch (error) {
        throw new Error(`Error borrowing book: ${error}`);
    }
};

// Kitap geri getirilmesini işlemek için servis fonksiyonu
export const returnBook = async (id: number, returnedAt?: Date, score?: number) => {
    try {
        // ID'ye göre Borrow kaydını buluyoruz
        const borrow = await Borrow.findByPk(id);
        if (!borrow) {
            throw new Error('Borrow record not found');
        }

        // Kaydı güncelliyoruz
        return await borrow.update({
            returnedAt: returnedAt || new Date(), // Geri dönüş tarihi, belirlenmemişse mevcut tarihi kullan
            score // Opsiyonel skor
        });
    } catch (error) {
        throw new Error(`Error returning book: ${error}`);
    }
};
