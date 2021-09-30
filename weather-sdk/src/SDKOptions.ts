export interface SDKOptions {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  handlers: SDKHandlers;
}

export interface SDKHandlers {
  timeoutError?(error: string): void;
  networkError?(error: string): void;
  clientError?(error: string): void;
  serverError?(error: string): void;
  genericError(error: string): void;
}
