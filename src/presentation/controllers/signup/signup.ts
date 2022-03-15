import { InvalidParamError, MissingBodyError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http-helper';
import {
  AccountModel,
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
} from './signup-protocols';

type RequestBodyType = Partial<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

type ResponseBodyType = AccountModel;

export class SignUpController implements Controller<RequestBodyType, ResponseBodyType> {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest<RequestBodyType>) {
    try {
      if (!httpRequest.body) {
        return badRequest(new MissingBodyError());
      }

      const requiredFields: Array<keyof RequestBodyType> = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isEmailValid = this.emailValidator.isValid(email!);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = await this.addAccount.add({
        name: name!,
        email: email!,
        password: password!,
      });

      return ok(account);
    } catch (err) {
      return serverError();
    }
  }
}
