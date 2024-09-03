import { Request, Response } from 'express';
import { getBooksService, getBookByIdService, createBookService} from '../services/bookService';

export const getBooksController = async (req: Request, res: Response) => {
    try {
        const books = await getBooksService();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getBookByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const book = await getBookByIdService(Number(id));
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createBookController = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const book = await createBookService(name);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};