import { AccountModel } from '../../../../domain/models/account';
import { getMongoHelper, MongoHelper } from '../helpers/mongo-helper';
import { AccountMongoRepository } from './account';

describe('Account Mongo Repository', () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await getMongoHelper();
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  test('should return an account on success', async () => {
    const sut = makeSut();
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    };

    const account = await sut.add(accountData);

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account).toEqual<AccountModel>({
      id: account.id,
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
    });
  });
});
