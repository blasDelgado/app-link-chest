import mongoose from 'mongoose';
import { mongodb_uri } from './config.js';

const db = async () => {
  try {
    let conenction = await mongoose.connect(mongodb_uri);
    console.log('Connected to MonogoDB');
    return conenction;
  } catch (e) {
    console.error(e);
  }
};

let connection = db();

export default connection;
