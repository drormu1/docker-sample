import { Request, Response } from 'express';
import { checkAndCreateIndex } from '../services/elasticsearchService';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
 
dotenv.config();

const client = new Client({ node: 'http://localhost:9200' });
const index = process.env.ELASTICSEARCH_INDEX || 'users';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    await checkAndCreateIndex(); // Ensure the index exists

    
    const response = await client.search({
      index,
      body: {
        query: {
          match_all: {}
        }
      }
    });

    const users = response.hits.hits.map((hit: any) => hit._source);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error details 
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  try {
    await checkAndCreateIndex(); // Ensure the index exists

    const response = await client.index({
      index,
      body: {
        name,
        phone
      }
    });

    res.status(201).json({ message: 'User created successfully', user: response });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};