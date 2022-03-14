import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { getMongoHelper } from '../helpers/mongo-helper';
import { accountModelMapper } from './account-mapper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = (await getMongoHelper()).getCollection('accounts');
    const { insertedId } = await accountCollection.insertOne({ ...accountData });

    return accountModelMapper(accountData, insertedId);
  }
}
