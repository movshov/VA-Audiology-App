# Client API Setup and Running

*Reference: `https://angular.io/guide/http` for any additional clarifications on Angular's http client object.*

## DEVELOPMENT REFERENCE
* To Use the Client API 
  * Include the Api service: `import { ServerApiService } from '../services/ServerApi.service';`
  * Add the Service to the Component Constructor: `constructor (private appointments: ServerApiService) { }`
  * Call the Service and add the appropriate `.subscribe()` function: For our own convetion: Expected objects will be placed in: `src/app/assets/ApiObjects` for typechecking purposes.
    * **Example**: Code to be placed in the component 
        ```javascript
            this.serverApiService.getTest().subscribe( (response: EXPECTED_OBJECT_TYPE) => {
                this.LOCAL_STRING_VAR = response.EXPECTED_STRING_VAR;
            }); 
        ```
    * Note: *The caller of the API Service should resolve the own Observer object in order to take advantage of asychronous waiting.*
<!-- TODO:
* To Add a new Client API. -->