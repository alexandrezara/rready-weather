import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

export class AutocompleteService {
  public url: string;
  public apiKey: string;

  constructor(url: string, apiKey: string) {
    this.url = url;
    this.apiKey = apiKey;
  }

  private config(query: string): AxiosRequestConfig {
    return {
      method: "get",
      url: this.url,
      params: {
        input: query,
        types: "(cities)",
        key: this.apiKey,
      },
    };
  }

  public autocomplete(query: string): AxiosPromise<IAutocomplete> {
    const config = this.config(query);
    return axios(config);
  }
}

export interface IAutocomplete {
  predictions: {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
    };
  }[];
}
