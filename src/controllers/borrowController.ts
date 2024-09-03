import { Request, Response } from 'express';
import { borrowBook, returnBook } from '../services/borrowService';
import { borrowBookSchema, returnBookSchema } from '../helpers/validator';

// Kitap ödünç almak için kontrolcü fonksiyonu
export const borrowBookController = async (req: Request, res: Response) => {
    const { error } = borrowBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, bookId } = req.body; // Gerekli parametreleri alıyoruz

    try {
        const borrow = await borrowBook(userId, bookId); // Yalnızca gerekli parametreleri gönderiyoruz
        res.status(201).json(borrow);
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Kitap geri getirilmesini işlemek için kontrolcü fonksiyonu
export const returnBookController = async (req: Request, res: Response) => {
    const { error } = returnBookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params; // Borrow ID'sini alıyoruz
    const { returnedAt, score } = req.body; // Geri dönüş tarihi ve opsiyonel skor

    try {
        const borrow = await returnBook(parseInt(id), returnedAt, score); // Yalnızca gerekli parametreleri gönderiyoruz
        res.status(200).json(borrow);
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
