import { Request, Response } from 'express';
import { getBooksService, getBookByIdService, createBookService} from '../services/bookService';
import { bookSchema } from '../helpers/validator';

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

export const createBookControlller = async (req: Request, res: Response) => {
    try {

        const { error, value } = bookSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const book = await createBookService(value.name);
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};