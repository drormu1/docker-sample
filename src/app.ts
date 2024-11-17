import express from 'express';
import "reflect-metadata";

import { getCategories, createCategory } from './controllers/category.controller';
import { connectDatabase } from './services/typeormService';  // Import database connection
import { UserController } from './controllers/user.controller';
import sql from 'mssql';

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await connectDatabase(); // Ensure the database is connected

        // Define routes
        app.get('/categories', getCategories);
        app.post('/categories', createCategory);
        const userController = new UserController();
        app.get('/users', userController.getUsers);
        app.post('/users', userController.addUser);

        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1); // Exit if the connection fails
    }
};

startServer();

export default app;
