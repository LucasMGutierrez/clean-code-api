import { Controller, HttpRequest } from '../../presentation/protocols';

export class LogControllerDecorator<ReqBody, ResBody> implements Controller<ReqBody, ResBody> {
  private readonly controller: Controller<ReqBody, ResBody>;

  constructor(controller: Controller<ReqBody, ResBody>) {
    this.controller = controller;
  }

  async handle(httpRequest: HttpRequest<ReqBody>) {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      // log
    }

    return httpResponse;
  }
}
