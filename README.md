# Ella Rashty
## Weather API


*Overview*
This API allows users to check for specific weather conditions within the next 72 hours, based on data
from the tomorrow.io/timeline API. The API allows users to specify the weather conditions in the form
of comparison statements such as "temperature > 30" and "wind < 30" and an operator, such as
"AND" or "OR", indicating how the conditions should be evaluated. The API returns a timeline that
displays whether or not the specified conditions are expected to occur in the next 72 hours.

## Requirements 
- Node.js version *18.16.1*
- Chrome browser or Postman 
## Installation

1. Unzip the file and open the folder with [VS Code](https://code.visualstudio.com/)
2. Open a new terminal window
3. Run the following commands:
sh
npm install 
npm run start

Great! now the server is running 

## Testing
Open a browser and go to this link:
> http://localhost:5001/api/weather-conditions?location=40.7,-73.9&rule=temperature%3E20,windSpeed%3C10,humidity%3E50&operator=AND

How to edit the parameters - 
http:// localhost:5001/api/weather-conditions?location=`{lat,lng}`&rule=`{temperature/windSpeed/humidity/rainIntensity ">" or "<" interger}`operator=`{AND/OR}`
 * To check more then one condition separate them with " `,` " between each other i.e: `rule=temperature>20,windSpeed<10`
 * To check the conditions  in an *AND* state change the operator to be equal = `AND`
 * To check the conditions  in an *OR* state change the operator to be equal = `OR`
 * If you forget to add the `operator=` the default state is set to  *AND*
 i.e: [http://localhost:5001/api/weather-conditions?location=40.7,-73.9&rule=temperature>20,windSpeed<10](http://localhost:5001/api/weather-conditions?location=40.7,-73.9&rule=temperature%3E20,windSpeed<10)
 * Please make sure there are *NO*  spaces in your URL

That's it! happy testing :)
