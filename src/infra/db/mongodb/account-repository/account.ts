import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { getMongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = (await getMongoHelper()).getCollection('accounts');
    const { insertedId } = await accountCollection.insertOne({ ...accountData });

    return {
      ...accountData,
      id: insertedId.toHexString(),
    };
  }
}
