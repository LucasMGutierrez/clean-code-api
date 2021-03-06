import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({
  isEmail: () => {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@mail.com');

    expect(isValid).toEqual(false);
  });

  test('should return true if validator returns true', () => {
    const sut = makeSut();

    const isValid = sut.isValid('valid_email@mail.com');

    expect(isValid).toEqual(true);
  });

  test('should return true if validator returns true', () => {
    const sut = makeSut();
    const email = 'any_email@mail.com';
    const isEmailSpy = jest.spyOn(validator, 'isEmail');

    sut.isValid(email);

    expect(isEmailSpy).toHaveBeenCalledWith(email);
  });
});
