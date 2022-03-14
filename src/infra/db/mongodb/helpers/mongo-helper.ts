import { MongoClient } from 'mongodb';

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
}
