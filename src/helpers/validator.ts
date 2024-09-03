import Joi from 'joi';


export const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

export const bookSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

export const borrowBookSchema = Joi.object({
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
});

export const returnBookSchema = Joi.object({
    returnedAt: Joi.date().iso().optional(), // Opsiyonel bir tarih
    score: Joi.number().integer().min(1).max(10).optional() // Opsiyonel bir puan
});
