import express from 'express';
import 'reflect-metadata';
import { connectDatabase } from './services/typeormService'; // Import database connection
import { getUsers, createUser } from './controllers/user.controller';
import { getCategories, createCategory } from './controllers/category.controller';

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const startServer = async () => {
    try {
        await connectDatabase(); // Ensure the database is connected

        // Define routes
        app.get('/categories', getCategories);
        app.post('/categories', createCategory);
        app.get('/users', getUsers);
        app.post('/users', createUser);

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