export interface ApiResponse<T, M = string> {
    Data: T;
    Message: M;
    Success: boolean;
  }
  
  export type ServiceResponse<T = unknown, M = string> = Promise<
    ApiResponse<T, M>
  >;
  