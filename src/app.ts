import express from 'express';
require('dotenv').config();
import { connect } from './database/connect.database';

const app = express();

(async () => {
  await connect();
  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
})();

export default app;
