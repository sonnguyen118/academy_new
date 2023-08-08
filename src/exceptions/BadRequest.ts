// File BadRequest.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequest extends HttpException {
  constructor(message: string) {
    super(
      {
        statusCode: 1,
        message: message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
