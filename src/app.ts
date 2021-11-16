import express from 'express';
require('dotenv').config();
import { DatabaseService } from './common/database.connect';

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});

(async () => {
  await DatabaseService.getInstance().dbConnect();
  console.log(DatabaseService.getCollection('users'));
})();
