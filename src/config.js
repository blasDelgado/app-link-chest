import { config } from 'dotenv';

config();

export const mongodb_uri = process.env.mongodb_uri;
export const token_crypt = process.env.token;
