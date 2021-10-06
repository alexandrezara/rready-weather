export class AutocompleteService {
  private service = new google.maps.places.AutocompleteService();

  constructor() {}

  public autocomplete(query: string): Promise<IAutocomplete> {
    return new Promise((resolve, reject) => {
      this.service.getQueryPredictions(
        { input: query },
        (
          predictions: google.maps.places.QueryAutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            reject(`Could not access Places API [status=${status}]`);
          } else if (predictions == null) {
            reject(`Places API returned null [predictions=null]`);
          } else {
            resolve({ predictions: predictions });
          }
        }
      );
    });
  }
}

export interface IAutocomplete {
  predictions: google.maps.places.QueryAutocompletePrediction[];
}
