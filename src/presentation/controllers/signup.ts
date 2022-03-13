import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, httpResponse } from '../protocols/http';

type RequestBodyType = Partial<{
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}>;

type ResponseBodyType = Error | undefined;

export class SignUpController implements Controller<RequestBodyType, ResponseBodyType> {
  handle(httpRequest: HttpRequest<RequestBodyType>): httpResponse<Error | undefined> {
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

    return {
      statusCode: 200,
      body: undefined,
    };
  }
}
