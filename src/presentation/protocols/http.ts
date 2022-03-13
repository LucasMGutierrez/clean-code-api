export interface httpResponse<BodyType> {
  statusCode: number;
  body: BodyType;
}

export interface HttpRequest<BodyType> {
  body?: BodyType;
}
