import { createConnection } from 'typeorm';
import { Category } from '../entities/category.entity'; // Import Category entity
import * as sql from 'mssql';

const sqlConfig = {
    user: 'sa',
    password: 'Password_01',
    server: 'localhost',
    port: 1433,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};

const createDatabase = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        await pool.request().query(`IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'DockerSample')
                                    CREATE DATABASE DockerSample`);
        console.log('Database created or already exists');
        await pool.close();
    } catch (err) {
        console.error('Error creating database', err);
    }
};

export const connectDatabase = async () => {
    await createDatabase(); // Ensure the database exists

    try {
        await createConnection({
            type: 'mssql',
            host: 'localhost',
            port: 1433, // Default SQL Server port
            username: 'sa',
            password: 'Password_01',
            database: 'DockerSample',
            synchronize: true, // Automatically sync database schema with entities
            logging: true,
            entities: [Category],
            options: {
                enableArithAbort: true, // Add this line to avoid deprecation warning
                encrypt: true // Use encryption
            }
        });
        console.log('Connected to SQL Server successfully');
    } catch (error) {
        console.error('Error connecting to SQL Server', error);
        process.exit(1); // Exit if the connection fails
    }
};