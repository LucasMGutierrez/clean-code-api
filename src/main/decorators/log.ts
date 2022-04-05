import { LogErrorRepository } from '../../data/protocols/log-error-repository';
import { Controller, HttpRequest } from '../../presentation/protocols';

export class LogControllerDecorator<ReqBody, ResBody> implements Controller<ReqBody, ResBody> {
  private readonly controller: Controller<ReqBody, ResBody>;

  private readonly logErrorRepository: LogErrorRepository;

  constructor(controller: Controller<ReqBody, ResBody>, logErrorRepository: LogErrorRepository) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: HttpRequest<ReqBody>) {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      this.logErrorRepository.logError((httpResponse.body as Error).stack!);
    }

    return httpResponse;
  }
}
