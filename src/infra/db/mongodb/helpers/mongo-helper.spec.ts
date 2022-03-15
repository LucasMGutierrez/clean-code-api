import { getMongoConnection, MongoHelper } from './mongo-helper';

describe('Mongo Helper', () => {
  let sut: MongoHelper;

  beforeAll(async () => {
    sut = await getMongoConnection();
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');

    expect(accountCollection).toBeTruthy();

    await sut.disconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });

  test('should allow disconnect several times without throwing', async () => {
    await sut.disconnect();
    await sut.disconnect();
  });
});
