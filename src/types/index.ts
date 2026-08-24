export * from './account';
export * from './hotel';
export * from './price';
export * from './provider';
export * from './user';

export type ResponseType<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type PaginationResponseType<T> = {
  data: T[];
  message: string;
  success: boolean;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
};
