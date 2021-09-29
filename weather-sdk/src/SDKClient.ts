import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { SDKHandlers, SDKOptions } from "./SDKOptions";

export class SDKClient {
  private handlers: SDKHandlers;
  private axios: AxiosInstance;

  constructor(options: SDKOptions) {
    this.handlers = options.handlers;
    this.axios = axios.create({
      baseURL: options.baseUrl,
      timeout: options.timeout,
    });
  }

  public send<R>(config: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      this.axios
        .request<R>(config)
        .then((success) => {
          resolve(success.data);
        })
        .catch((error) => {
          this.errorInterceptor(error);
          reject(error);
        });
    });
  }

  private errorInterceptor = (error: any) => {
    const statusCode = error?.response?.status;

    if (error.code === "ECONNABORTED") {
      this.handle(error, this.handlers.timeoutError);
    } else if (statusCode === undefined || error.message == "Network Error") {
      this.handle(error, this.handlers.networkError);
    } else if (statusCode >= 400 && statusCode < 500) {
      this.handle(error, this.handlers.clientError);
    } else if (statusCode >= 500 && statusCode < 600) {
      this.handle(error, this.handlers.serverError);
    } else {
      this.handle(error);
    }
  };

  private handle(error: any, handler?: (_: any) => void) {
    if (handler) {
      handler(error);
    } else {
      this.handlers.genericError(error);
    }
  }
}
