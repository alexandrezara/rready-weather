# Teste de Documentação

# WEATHER APP
## Challenge
Define and implement a Weather Web App in Vue.js
1. Make a very basic sketch of how your application will look like
   - It can be done by hand on paper, or on Figma
1. Implement a custom Weather Widget Component and display one widget for each city where rready AG has a development team
   - The widget shows basic weather information: city name, current temperature and condition
   - Use openweathermap.org API
1. User should be able to rearrange the widgets via Drag and Drop, as well as remove widgets
1. User should be able to add more widgets for any city in the world by using a search field with City Name Autocomplete
   - Integrate the city name autocomplete API of your choice

**💪 Plus points**

1. The app is written in Vue.js + Typescript
1. For each city/widget, the user should be able to configure which weather fields are displayed
   - By default: city name, condition and current temperature
   - Additional user defined fields: min/max temperature, sunrise/sunset, wind speed
   - This configuration should be persisted (the way you prefer)
1. The UI should look good if the API's are down
1. The solution is delivered as a container, ready to be integrated into a deployment pipeline

## How to run
1. On **weather-sdk**
   - Install modules ```npm install```
   - Run ```build``` script
1. On **weather-app**
   - Install modules ```npm install```
   - Run ```serve```  script
