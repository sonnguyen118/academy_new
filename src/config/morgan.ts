import morgan from 'morgan';
// import config from './index';
import logger from './logger';
import { Response, Request } from 'express';

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || '',
);
const getIpFormat = (): string =>
  process.env.NODE_ENV === 'production' ? ':remote-addr - ' : '';

const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };
