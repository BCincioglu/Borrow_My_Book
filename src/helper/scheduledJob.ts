import cron from 'node-cron';
import { calculateBookAverageScoreService } from '../services/bookAverageScoresService';

// Calculate Scores Every Day
cron.schedule('0 0 * * *', () => {
    try {
    calculateBookAverageScoreService();
    } catch (error) {
        throw new Error("An error occurred while calculating scores.");
    }
}, {
    timezone: "Europe/Istanbul" 
});
