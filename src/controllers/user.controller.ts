import { Request, Response } from 'express';
import { Client } from '@elastic/elasticsearch';
import { User } from '../entities/user.entity';

const client = new Client({
  node: 'http://localhost:9200', // Assuming Elasticsearch is running locally on port 9200
});

export class UserController {
  // Get all users from Elasticsearch
  async getUsers(req: Request, res: Response) {
    try {
      const response = await client.search({
        index: 'users', // Specify the Elasticsearch index to search
        body: {
          query: {
            match_all: {}, // Match all documents in the index
          },
        },
      });
      res.json(response.hits.hits); // Return the users in the response
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add a new user to Elasticsearch
  async addUser(req: Request, res: Response) {
    const { id, name, phone }: User = req.body;
    try {
      await client.index({
        index: 'users', // Specify the Elasticsearch index
        id: id.toString(), // Use the ID provided in the request
        body: {
          name,
          phone,
        },
      });
      res.status(201).json({ message: 'User added' });
    } catch (error:any ) {
      res.status(500).json({ error: error.message });
    }
  }
}
