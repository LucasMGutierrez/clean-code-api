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

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
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
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
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
});
