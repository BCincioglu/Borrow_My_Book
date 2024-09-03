import User from '../models/user';

export const getUsersService = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        // console.error("Error fetching users:", error);
        throw new Error("An error occurred while fetching users.");
    }
};

export const getUserByIdService = async (id: number) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        // console.error(`Error fetching user with ID ${id}:`, error);
        throw new Error(`An error occurred while fetching the user with ID ${id}.`);
    }
};

export const createUserService = async (name: string) => {
    try {
        return await User.create({ name });
    } catch (error) {
        // console.error("Error creating user:", error);
        throw new Error("An error occurred while creating the user.");
    }
};
