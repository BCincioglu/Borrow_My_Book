import { Request, Response } from 'express';
import { getUsersService, createUserService, getUserByIdService } from '../services/userService';
import { userSchema } from '../helpers/validator';

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
    try {

        const { error, value } = userSchema.validate(req.body);
        
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const user = await createUserService(value.name);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};