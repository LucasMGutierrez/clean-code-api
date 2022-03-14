import { Collection, MongoClient } from 'mongodb';

export class MongoHelper {
  client: MongoClient;

  constructor(client: MongoClient) {
    this.client = client;
  }

  static async connect(uri: string) {
    const client = await MongoClient.connect(uri);
    const mongoHelper = new MongoHelper(client);
    return mongoHelper;
  }

  async disconnect() {
    await this.client.close();
  }

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  }
}

let mongoHelper: MongoHelper | undefined;

export const getMongoHelper = async () => {
  if (!mongoHelper) {
    mongoHelper = await MongoHelper.connect(process.env.MONGO_URL!);
  }

  return mongoHelper;
};
