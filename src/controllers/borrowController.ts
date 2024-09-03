import { Request, Response } from 'express';
import { borrowBook, returnBook } from '../services/borrowService';

// Kitap ödünç almak için kontrolcü fonksiyonu
export const borrowBookController = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    try {
        const borrow = await borrowBook(Number(userId), Number(bookId));
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
    const { userId, bookId } = req.params;
    const { returnedAt, score } = req.body;

    try {
        const borrow = await returnBook(Number(userId), Number(bookId), returnedAt, score);
        res.status(200).json(borrow);
    } catch (error: any) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};