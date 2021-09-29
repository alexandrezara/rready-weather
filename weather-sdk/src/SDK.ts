import { SDKClient } from "./SDKClient";
import { SDKOptions } from "./SDKOptions";

export class SDK {
  private apiKey: string;
  private client: SDKClient;

  constructor(options: SDKOptions) {
    this.apiKey = options.apiKey;
    this.client = new SDKClient(options);
  }

  weather(city: string) {
    return this.client.send({
      method: "get",
      url: "weather",
      params: {
        q: city,
        appid: this.apiKey,
      },
    });
  }
}
