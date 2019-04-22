# Client API Setup and Running

*Reference: `https://angular.io/guide/http` for any additional clarifications on Angular's http client object.*

## DEVELOPMENT REFERENCE
* To Create a Service using the Client's Base API 
  * Create the new desired service. (This should be housed in the same folder as the component being serviced)
  * Include the Api service: `import { ServerApiService } from '../services/ServerApi.service';`
  * Add the Service to the Component Constructor: `constructor (private serverApiService: ServerApiService) { }`
  * Call the GET/POST/DELETE Service as desired. (Add the additional data to the url as desired).
    * This function will return an `Observable<any>` object to be used as deemed fit. The calling function should typecheck this object by returning a typed observable object.
    * Example: 
    ```javascript
        public getAppointmentReference(): Observable<AppointmentReference> {
            return this.app(this.ServerApiService.getFromDatabase('appointments'));
        }
    ```

* To Use the Service in a COmponent
  * In the *Component* being serviced, and add the appropriate `.subscribe()` function: For our own convetion: Expected objects will be placed in: `src/app/assets/ApiObjects` for typechecking purposes.
    * **Example**: Code to be placed in the component 
        ```javascript
            this.serverApiService.getTest().subscribe( (response: EXPECTED_OBJECT_TYPE) => {
                this.LOCAL_OJBECT = response;
            }); 
        ```
    * Note: *The caller of the API Service should resolve the own Observer object in order to take advantage of asychronous 