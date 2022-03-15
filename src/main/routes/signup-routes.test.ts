import request from 'supertest';
import { getMongoHelper, MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp Routes', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await getMongoHelper();
  });

  beforeEach(async () => {
    mongoHelper = await getMongoHelper();
    const accountCollection = mongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });
  test('should return an account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'User', email: 'user@mail.com', password: '123', passwordConfirmation: '123' })
      .expect(200);
  });
});
