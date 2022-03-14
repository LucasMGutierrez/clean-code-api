import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

const salt = 12;
const mockedHash = 'any_hash';

jest.mock('bcrypt', () => ({
  hash: async () => mockedHash,
}));

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    const value = 'any_value';

    await sut.encrypt(value);

    expect(hashSpy).toHaveBeenCalledWith(value, salt);
  });

  test('should return a hash on success', async () => {
    const sut = makeSut();

    const hash = await sut.encrypt('any_value');

    expect(hash).toEqual(mockedHash);
  });

  test('should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()));

    await expect(sut.encrypt('any_value')).rejects.toThrow();
  });
});
