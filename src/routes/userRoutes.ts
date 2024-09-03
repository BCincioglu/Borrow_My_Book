import { Router } from 'express';
import { getUsersController, getUserByIdController, createUserController } from '../controllers/userController';
import validate, {returnBookSchema, userSchema}  from '../middlewares/validate';
import { borrowBookController, returnBookController } from '../controllers/borrowController';

const router = Router();

router.get('/', getUsersController);
router.get('/:id', getUserByIdController);

router.post('/', validate(userSchema), createUserController);

router.post('/:userId/borrow/:bookId', borrowBookController);
router.post('/:userId/return/:bookId',validate(returnBookSchema), returnBookController);

export default router;