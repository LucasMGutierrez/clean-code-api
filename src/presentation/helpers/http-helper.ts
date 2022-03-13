import { httpResponse } from '../protocols/http';

export const badRequest = (error: Error): httpResponse<Error> => ({ statusCode: 400, body: error });
