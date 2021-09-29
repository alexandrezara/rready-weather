import { AxiosResponse } from "axios";
import { SDKClient } from "./SDKClient";
import { ICityWeather } from "./SDKInterfaces";
import { SDKOptions } from "./SDKOptions";

export class SDK {
  private apiKey: string;
  private client: SDKClient;

  constructor(options: SDKOptions) {
    this.apiKey = options.apiKey;
    this.client = new SDKClient(options);
  }

  weather(city: string): Promise<ICityWeather> {
    return this.client.send<ICityWeather>({
      method: "get",
      url: "weather",
      params: {
        q: city,
        appid: this.apiKey,
      },
    });
  }
}
