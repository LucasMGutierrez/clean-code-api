import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../presentation/protocols';

export const adaptRoute = <ReqBody, ResBody>(controller: Controller<ReqBody, ResBody>) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest<ReqBody> = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
