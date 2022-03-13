import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';
import {
  AddAccount,
  Controller,
  EmailValidator,
  HttpRequest,
  httpResponse,
} from './signup-protocols';

type RequestBodyType = Partial<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

type ResponseBodyType = Error | undefined;

export class SignUpController implements Controller<RequestBodyType, ResponseBodyType> {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest<RequestBodyType>): httpResponse<Error | undefined> {
    try {
      if (!httpRequest.body) {
        throw new Error('No body');
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

      this.addAccount.add({ name: name!, email: email!, password: password! });

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (err) {
      return serverError();
    }
  }
}
