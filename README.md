## Starting the application
1. Pull this project
2. [Install npm](https://docs.npmjs.com/downloading-and--node-js-and-npm) and run `npm install` in the root of this project
3. Ensure that ports `8010`, `8011`, and `8012` are unused and run `npm run dev`
4. Visit http://localhost:5173 to track some crimes!

## A note on the ports
Due to this application running solely in the browser but still needing to access
external apis, CORS issues are a guarantee. Browsers are only trying to protect us 
from unwanted network requests. 

Due to time constraints, the solution I went with for this project was to spin up
a proxy server using the npm package [local-cors-proxy](https://www.npmjs.com/package/local-cors-proxy).
There exists a proxy server for each API which all require their own port. This is the reason
that the specified ports need to be free.

## APIs used
- Football data API: https://www.football-data.org
- Postcodes API: https://postcodes.io/
- UK Police Data API: https://data.police.uk/