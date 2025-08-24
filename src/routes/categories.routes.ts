import { Router } from 'express';
import { CategoriesController } from '../controllers/categories.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { createCategoryDto, updateCategoryDto, createQuickActionDto } from '../dtos/category.dto.js';

const r = Router();

r.get('/', CategoriesController.list);
r.post('/', validateBody(createCategoryDto), CategoriesController.create);
r.patch('/:id', validateBody(updateCategoryDto), CategoriesController.update);
r.delete('/:id', CategoriesController.remove);
r.post('/:id/quick', validateBody(createQuickActionDto), CategoriesController.addQuick);

export default r;
