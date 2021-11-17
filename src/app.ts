import express from 'express';
require('dotenv').config();
import { connect } from './database/connect.database';
import router from './routes/index.routes'

const app = express();


app.use(router);

(async () => {
  await connect();
  app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
})();

export default app;
