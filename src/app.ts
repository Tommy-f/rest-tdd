import express from 'express';
require('dotenv').config();
import { connect } from './database/database.connect';

const app = express();

(async () => {
  await connect();
  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
})();
