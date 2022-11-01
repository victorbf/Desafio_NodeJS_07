import { Client } from 'pg';

export const client = new Client({
  database: 'qodeless_2',
});
