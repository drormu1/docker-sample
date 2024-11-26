import { Router } from 'express';
import { getUsers, createUser } from './controllers/user.controller';
import { getCategories, createCategory } from './controllers/category.controller';

const router = Router();

// Define routes

router.get('/test', async (req, res) => {
    try {
        res.send('Hello from Express');
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await getCategories(req, res);
        res.render('showCategories', { title: 'All Categories', categories });
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

router.post('/categories', createCategory);

router.get('/add-category', (req, res) => {
    res.render('addCategory', { title: 'Add Category' });
});


router.get('/users', getUsers);
router.post('/users', createUser);

export default router;