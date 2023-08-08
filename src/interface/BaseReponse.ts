export interface IListResponse<T> {
  statusCode: number;
  message: string;
  data: IDataListResponse<T>;
}

export interface IBadResponse {
  statusCode: number;
  message: string;
}

export interface IDataListResponse<T> {
  listData: T[];
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
}

export interface IListSelectResponse {
  data: IDataListSelectResponse[];
  message: string;
  statusCode: number;
}

export interface IDataListSelectResponse {
  id: number;
  name: string;
}
