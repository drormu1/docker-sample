import { createConnection } from 'typeorm';
import { Category } from '../entities/category.entity'; // Import Category entity
import * as sql from 'mssql';


//curl -X GET "localhost:9200/users/_settings?pretty"
//curl -X GET "localhost:9200/_cat/indices?v"
//curl -X GET "localhost:9200/users/_mapping?pretty"
//curl -X GET "localhost:9200/users/_search?pretty"


const dbConfig = {
    user: 'sa',
    password: 'Password_01',
    server: 'localhost', // Use the service name 'sqlserver'
    port: 1433,
    database: 'DockerSample',
    options: {
        enableArithAbort: true,
        encrypt: true,
        trustServerCertificate: true // Add this line to trust the self-signed certificate
    }
}; 

const createDatabase = async () => {
    try {
        const pool = await sql.connect(dbConfig);
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
            host: dbConfig.server,
            port: dbConfig.port, // Default SQL Server port
            username: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
            synchronize: true, // Automatically sync database schema with entities
            logging: true,
            entities: [Category],
            options: dbConfig.options
        });
        console.log('Connected to SQL Server successfully');
    } catch (error) {
        console.error('Error connecting to SQL Server', error);
        process.exit(1); // Exit if the connection fails
    }
};