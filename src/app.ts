import express from 'express';
require('dotenv').config();
import { connect } from './database/connect.database';
import router from './routes/index.routes';
import { seeder } from './database/seed.database';

const app = express();

app.use('/api', router);
app.use(express.json());

(async () => {
  await connect();
  await seeder();

  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
})();

export default app;
