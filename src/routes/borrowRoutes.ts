import { Router } from 'express';
import { borrowBookController, returnBookController } from '../controllers/borrowController';
import validate, { returnBookSchema } from '../middlewares/validate';

const router = Router();

router.post('/users/:userId/borrow/:bookID', borrowBookController);

router.post('/users/:userId/return/:bookID',validate(returnBookSchema), returnBookController);

export default router;
