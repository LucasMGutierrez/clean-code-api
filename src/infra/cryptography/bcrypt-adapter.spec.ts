import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  hash: async () => 'any_hash',
}));

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    const value = 'any_value';

    await sut.encrypt(value);

    expect(hashSpy).toHaveBeenCalledWith(value, salt);
  });

  test('should return a hash on success', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const value = 'any_value';

    const hash = await sut.encrypt(value);

    expect(hash).toEqual('any_hash');
  });
});
