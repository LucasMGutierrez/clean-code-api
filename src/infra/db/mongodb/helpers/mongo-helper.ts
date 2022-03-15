import { Collection, MongoClient } from 'mongodb';

export class MongoHelper {
  client: MongoClient | null;

  uri: string;

  constructor(uri: string) {
    this.uri = uri;
    this.client = null;
  }

  async connect() {
    this.client = await MongoClient.connect(this.uri);
  }

  async disconnect() {
    await this.client?.close();
    this.client = null;
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect();
    }

    return this.client!.db().collection(name);
  }
}

let mongoHelper: MongoHelper | undefined;

export const getMongoConnection = async (uri?: string): Promise<MongoHelper> => {
  if (!mongoHelper) {
    mongoHelper = new MongoHelper(uri || process.env.MONGO_URL!);
    await mongoHelper.connect();
  }

  return mongoHelper;
};
