import cron from 'node-cron';
import { calculateBookAverageScores } from '../services/bookAverageScoresService';

cron.schedule('0 0 * * *', () => {
    try {
    calculateBookAverageScores();
    } catch (error) {
        throw new Error("An error occurred while calculating scores.");
    }
}, {
    timezone: "Europe/Istanbul" 
});
