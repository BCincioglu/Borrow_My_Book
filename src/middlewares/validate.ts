import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Joi Şemaları
export const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

export const bookSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

export const returnBookSchema = Joi.object({
    returnedAt: Joi.date().iso().optional(), 
    score: Joi.number().integer().min(1).max(10).optional()
});

const validate = (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};



export default validate;
