import {
  IListResponse,
  IBadResponse,
  IDataListResponse,
  IDataListSelectResponse,
  IListSelectResponse,
} from '@interface/BaseReponse';

export function ListResponse<T>(data: IDataListResponse<T>): IListResponse<T> {
  return {
    statusCode: 0,
    message: 'Success',
    data: data,
  };
}

export function ListSelectResponse(
  data: IDataListSelectResponse[],
): IListSelectResponse {
  return {
    statusCode: 0,
    message: 'Success',
    data: data,
  };
}

export function BadResponse(message: string): IBadResponse {
  return {
    statusCode: 1,
    message: message,
  };
}
