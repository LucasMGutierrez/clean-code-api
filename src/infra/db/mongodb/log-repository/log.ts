import { LogErrorRepository } from '../../../../data/protocols/log-error-repository';
import { getMongoConnection } from '../helpers/mongo-helper';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await (await getMongoConnection()).getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}
