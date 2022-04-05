import { Collection } from 'mongodb';
import { getMongoConnection, MongoHelper } from '../helpers/mongo-helper';
import { LogMongoRepository } from './log';

describe('Log MongoDB Repository', () => {
  let mongoHelper: MongoHelper;
  let errorCollection: Collection;

  beforeAll(async () => {
    mongoHelper = await getMongoConnection();
  });

  beforeEach(async () => {
    mongoHelper = await getMongoConnection();
    errorCollection = await mongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  test('should create an error log on success', async () => {
    const sut = new LogMongoRepository();

    await sut.logError('any_error');

    expect(await errorCollection.countDocuments()).toEqual(1);
  });
});
