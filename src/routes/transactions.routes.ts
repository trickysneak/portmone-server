import { Router } from 'express';
import { TransactionsController } from '../controllers/transactions.controller.js';
import { validateBody, validateQuery } from '../middlewares/validate.js';
import { createTransactionDto, listQueryDto } from '../dtos/transaction.dto.js';

const r = Router();

r.get('/', validateQuery(listQueryDto), TransactionsController.list);
r.post('/', validateBody(createTransactionDto), TransactionsController.create);

export default r;
