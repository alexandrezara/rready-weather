import { ICityWeather } from "@rready/weather-sdk";

export class Converter {
  public static toIWeather(input: ICityWeather) {
    return {
      temp: input.main.temp,
      pressure: input.main.pressure,
      humidity: input.main.humidity,
      temp_min: input.main.temp_min,
      temp_max: input.main.temp_max,
      condition: {
        name: input.weather[0].main,
        description: input.weather[0].description,
        icon: input.weather[0].icon,
      },
      visibility: input.visibility,
      windSpeed: input.wind.speed,
      windDeg: input.wind.deg,
      country: input.sys.country,
      sunrise: input.sys.sunrise,
      sunset: input.sys.sunset,
      timezone: input.timezone,
    };
  }
}
