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
    if (!httpRequest.body?.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body?.email) {
      return badRequest(new MissingParamError('email'));
    }

    return {
      statusCode: 200,
      body: undefined,
    };
  }
}
