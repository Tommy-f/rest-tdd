import mongoose, {
  Collection,
  Connection,
  ConnectOptions,
  Mongoose,
} from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class DatabaseService {
  private static instance: DatabaseService;

  private mongoServer: MongoMemoryServer;

  static getInstance(): DatabaseService {
    if (!this.instance) {
      this.instance = new DatabaseService();
    }
    return this.instance;
  }

  public async dbConnect(): Promise<void> {
    try {
      this.mongoServer = new MongoMemoryServer();
      const uri = this.mongoServer.getUri();

      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    } catch (error) {
      console.log(error);
    }
  }

  public async dbDisconnect(): Promise<void> {
    await mongoose.disconnect();
    await this.mongoServer.stop();
  }

  static getCollection(collection: string) {
    return mongoose.connection.collection(collection);
  }
}
