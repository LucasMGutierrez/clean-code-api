import { HttpRequest, httpResponse } from './http';

export interface Controller<RequestBodyType, ResponseBodyType> {
  handle(httpRequest: HttpRequest<RequestBodyType>): Promise<httpResponse<ResponseBodyType>>;
}
