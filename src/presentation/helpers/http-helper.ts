import { ServerError } from '../errors';
import { httpResponse } from '../protocols';

export const badRequest = (error: Error): httpResponse<Error> => ({ statusCode: 400, body: error });

export const serverError = (): httpResponse<Error> => ({
  statusCode: 500,
  body: new ServerError(),
});

export const ok = <T>(data: T): httpResponse<T> => ({ statusCode: 200, body: data });
