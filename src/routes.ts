import { Router } from 'express';
import userController from './controllers/user.controller';
import categoryController from './controllers/category.controller';

const router = Router();

// Define routes for categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await categoryController.getCategories(req, res);
        res.render('showCategories', { title: 'All Categories', categories });
    } catch (error) {
        res.status(500).send('Error fetching categories');
    }
});

router.post('/categories', categoryController.createCategory);

router.get('/add-category', (req, res) => {
    res.render('addCategory', { title: 'Add Category' });
});

// Define routes for users
router.get('/users', async (req, res) => {
    try {
        const users = await userController.getUsers(req, res);
        res.render('showUsers', { title: 'All Users', users });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

router.post('/users', userController.createUser);

router.get('/add-user', (req, res) => {
    res.render('addUser', { title: 'Add User' });
});

router.get('/test', (req, res) => {
    res.send('response from test route');
});

router.get('/', (req, res) => {
    //res.send('response from root route');
    res.redirect('/categories');
});



export default router; 