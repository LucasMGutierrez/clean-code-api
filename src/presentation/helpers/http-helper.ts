import { ServerError } from '../errors/server-error';
import { httpResponse } from '../protocols/http';

export const badRequest = (error: Error): httpResponse<Error> => ({ statusCode: 400, body: error });

export const serverError = (): httpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(),
});
