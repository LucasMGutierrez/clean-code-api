import { LogErrorRepository } from '../../data/protocols/log-error-repository';
import { serverError } from '../../presentation/helpers/http-helper';
import { Controller, HttpRequest } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

type ReqBody = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
};

type ResBody = {
  name: string;
};

type SutTypes = {
  sut: LogControllerDecorator<ReqBody, ResBody>;
  controllerStub: Controller<ReqBody, ResBody>;
  logErrorRepositoryStub: LogErrorRepository;
};

const makeFakeRequest = (): HttpRequest<ReqBody> => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeController = () => {
  class ControllerStub implements Controller<ReqBody, ResBody> {
    async handle(httpRequest: HttpRequest<ReqBody>) {
      const httpResponse = {
        body: {
          name: httpRequest.body!.name,
        },
        statusCode: 200,
      };

      return httpResponse;
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    // eslint-disable-next-line
    async logError(stack: string) {
      return undefined;
    }
  }

  return new LogErrorRepositoryStub();
};

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should call controller handle', async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      body: {
        name: 'any_name',
      },
      statusCode: 200,
    });
  });

  test('should call LogErrorRepository with correct if controller returns server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';

    const error = serverError(fakeError);

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');
    jest.spyOn(controllerStub, 'handle').mockResolvedValueOnce(error);

    const httpRequest = makeFakeRequest();

    await sut.handle(httpRequest);

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
