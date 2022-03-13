import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator, HttpRequest, httpResponse } from '../protocols';

type RequestBodyType = Partial<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

type ResponseBodyType = Error | undefined;

export class SignUpController implements Controller<RequestBodyType, ResponseBodyType> {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
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

      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email!);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: undefined,
      };
    } catch (err) {
      return serverError();
    }
  }
}
