import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({ node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200' ,requestTimeout: 60000});
const index = process.env.ELASTICSEARCH_INDEX || 'users';

export const checkAndCreateIndex = async () => {
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
    console.log(`Index ${index} created`);
  } else {
    console.log(`Index ${index} already exists`);
  }
};