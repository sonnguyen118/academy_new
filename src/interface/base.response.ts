export class BaseResponse {
  data: any;
  message: string;
  statusCode: number;
  constructor(msg?: string, data?: any, statusCode?: number) {
    this.data = data;
    this.message = msg;
    this.statusCode = statusCode;
  }
}
