import express from 'express';
require('dotenv').config();
import { connect } from './database/connect.database';
import router from './routes/index.routes';
import { seeder } from './database/seed.database';

const app = express();

app.use(express.json());
app.use('/api', router);

(async () => {
  await connect();
  // await seeder();

  app.listen(
    process.env.NODE_ENV === 'test' ? undefined : process.env.PORT,
    () => {
      console.log(`Listening on ${process.env.PORT}`);
    }
  );
})();

export default app;
