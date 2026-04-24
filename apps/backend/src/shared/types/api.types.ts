export interface IApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
