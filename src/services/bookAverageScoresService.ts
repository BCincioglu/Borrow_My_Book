import { Op, Sequelize } from 'sequelize';
import Borrow from '../models/borrow';
import Book from '../models/book';

export const calculateBookAverageScores = async () => {
    try {

        // Calculate Score
        const averageScores = await Borrow.findAll({
            where: {
                returnedAt: {
                    [Op.not]: null, 
                },
                score: {
                    [Op.not]: null,
                },
            },
            attributes: [
                'bookId',
                [Sequelize.fn('AVG', Sequelize.col('score')), 'averageScore']
            ],
            group: ['bookId'],
            raw: true
        });
        // Set Score
        for (const record of averageScores) {
            const { bookId, averageScore } = record;
            
            await Book.update(
                { score: averageScore },
                { where: { id: bookId } }
            );
        }

        console.log('Book scores have been successfully updated.');
    } catch (error) {
        console.error('Error updating book scores:', error);
    }
};