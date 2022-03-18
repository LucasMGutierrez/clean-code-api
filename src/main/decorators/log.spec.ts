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
};

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

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return {
    sut,
    controllerStub,
  };
};

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledTimes(1);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  test('should call controller handle', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      body: {
        name: 'any_name',
      },
      statusCode: 200,
    });
  });
});
