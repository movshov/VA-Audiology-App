
# Download And Start Api
This document is a short guide on how to download this
repository and run the server api that interacts with
the database.

# Requirements
* Git
* Node
* NPM
* Postgres Database configured

# Install and Start
So you want to install the VA-Auidology-App. Good new, it is pretty easy to run. Below is an instillation guide

1) From your prefered commandline, navigate to your Github Projects Folder
2) Clone the VA app project to local: `git clone https://github.com/movshov/VA-Audiology-App.git`
3) Navigate directly to the repository you just downloaded's api folder: `*/VA-Audiology-App/api/`
5) Make a new config file: `cp config.example config.ts`
6) Configure your new config file to use your local names and values
7) Install the required packages: `npm install`
8) Finally, build the typescript into javascript `npm run tsc`

Once these steps are completed, the VA-Audiology-App should be set up.
To start the api offically you can use `npm run server`

# Adding a new endpoint
So you want to add a new endpoint to the api. Great! The following guide will present a brief overview of what needs to be done to add a new endpoint

First, you'll need to make a new typescript file. Once you have a blank file you can start by adding this to it.
```
import * as auth from './authenticate';
import db from './db';
import handler from './handler';

export default handler(async (request: any) => {
  return await db(async (connection) => {

  });
}, auth.mustBeAdmin);

```

The code above is a stub for new endpoint. Some key things to note.
1) You'll need to make serveral imports. One for the database handler, one for the authentication handler, and one for the function handler.
2) The new function needs to be exported. This is so the app.ts can route your new endpoint
3) The new function needs to have some sort of authentication. In the stud above, the new endpoint will only be available if the request to endpoint is made by an admin. `VA-Audiology-App/api/authenticate.ts` contains the list of acceptable authentication types.

Once you have your file ready, it is time to add your endpoint to `app.ts`.
In `app.ts` there is a section of imports and endpoint mappings.
```import heartbeatEndpoint from './heartbeat';
app.get('/heartbeat', heartbeatEndpoint);
import loginEndpoint from './login';
app.post('/login', loginEndpoint);
import changePasswordEndpoint from './changePassword';
app.post('/changePassword', changePasswordEndpoint);

// -- ACCOUNTS --
import accountsGetEndpoint from './accountsGET';
app.get('/accounts', accountsGetEndpoint);
...
```
Find an approprate location for your new endpoint. For example if you are creating a new endpoints that relates to accounts, add your import and endpoint type to the `ACCOUNTS` section.

After all the instructions above are complete, you can rebuild the server using `npm run tsc`. Likewise if you are doing live development, you can use `npm run debug` to have the api update everytime a file change is made.