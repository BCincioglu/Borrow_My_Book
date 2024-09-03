import { Router } from 'express';
import { getBooksController, createBookController, getBookByIdController } from '../controllers/bookController';
import validate, {bookSchema} from '../middlewares/validate';


const router = Router();

router.get('/',getBooksController );
router.get('/:id', getBookByIdController);

router.post('/', validate(bookSchema), createBookController);

export default router;
