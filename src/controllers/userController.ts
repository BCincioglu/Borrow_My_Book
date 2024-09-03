import { Request, Response } from 'express';
import { getUsersService, createUserService, getUserByIdService } from '../services/userService';

export const getUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getUsersService();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const book = await getUserByIdService(Number(id));
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createUserController = async (req: Request, res: Response) => {
    const { name } = req.body;
    
    try {
        const user = await createUserService(name);
        res.status(201).json(user);
    } catch (error) {
        console.log('abc');
        res.status(500).json({ error: error });
    }
};