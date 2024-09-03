import Book from '../models/book';

export const getBooksService = async () => {
    try {
        return await Book.findAll();
    } catch (error) {
        throw new Error("An error occurred while fetching books.");
    }
};

export const getBookByIdService = async (id: number) => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error("Book not found");
        }
        return book;
    } catch (error) {
        throw new Error(`An error occurred while fetching the book with ID ${id}.`);
    }
};

export const createBookService = async (name: string) => {
    try {
        return await Book.create({ name });
    } catch (error) {
        throw new Error("An error occurred while creating the book.");
    }
};