import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { connectDatabase } from './services/typeormService'; // Import database connection
import { getUsers, createUser } from './controllers/user.controller';
import { getCategories, createCategory } from './controllers/category.controller';
import routes from './routes'; // Import routes
import { engine } from 'express-handlebars';
import exphbs from 'express-handlebars';

import Handlebars from 'handlebars';


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Serve static files from the public folder
app.use(express.static('public'));

const startServer = async () => {
    try {
        await connectDatabase(); // Ensure the database is connected

        // Use routes
        app.use('/', routes);
     
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