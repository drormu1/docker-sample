import { Request, Response } from 'express';
import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
import logger from '../logger'; // Import logger

dotenv.config();

const client = new Client({ node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200' });
const index = process.env.ELASTICSEARCH_INDEX || 'users';

const checkAndCreateIndex = async () => {
  const indexExists = await client.indices.exists({ index });

  if (!indexExists) {
    await client.indices.create({
      index,
      body: {
        mappings: {
          properties: {
            id: { type: 'integer' },
            name: { type: 'text' },
            phone: { type: 'text' }
          }
        }
      }
    });
    logger.info(`Index ${index} created`);
  } else {
    logger.info(`Index ${index} already exists`);
  }
};

const userController = {
  // Get all users
  getUsers: async (req: Request, res: Response) => {
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
      return users;
    } catch (error) {
      logger.error('Error fetching users:', error); // Log the error details
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },

  // Create a new user
  createUser: async (req: Request, res: Response) => {
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
      res.redirect('/users');
      //res.status(201).json({ message: 'User created successfully', user: response });
    } catch (error) {
      logger.error('Error creating user:', error); // Log the error details
      res.status(500).json({ message: 'Error creating user', error });
    }
  }
};

export default userController;