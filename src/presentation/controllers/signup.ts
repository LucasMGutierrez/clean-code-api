import { MissingParamError } from '../errors/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { HttpRequest, httpResponse } from '../protocols/http';

type RequestBodyType = {
  name?: string;
  email?: string;
  password: string;
  passwordConfirmation: string;
};

export class SignUpController {
  handle(httpRequest: HttpRequest<RequestBodyType>): httpResponse<Error | undefined> {
    if (!httpRequest.body) {
      throw new Error('No body');
    }

    const requiredFields: Array<keyof RequestBodyType> = ['name', 'email'];

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
