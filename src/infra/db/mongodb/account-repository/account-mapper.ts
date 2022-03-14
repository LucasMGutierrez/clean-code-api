import { ObjectId } from 'mongodb';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

export const accountModelMapper = (
  accountData: AddAccountModel,
  insertedId: ObjectId
): AccountModel => ({
  id: insertedId.toHexString(),
  name: accountData.name,
  email: accountData.email,
  password: accountData.password,
});
