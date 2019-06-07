# Client Hierarchy

## Table of Contents

- [Location](#location)
- [Home](#home)
- [Survey](#survey)
- [After Patient Summary Tinnitus Exercises](#After-patient-summary-tinnitus-exercises)
- [Logging In](#logging-in)
- [Creating/Selecting a Patient](#creatingselecting-a-patient)
- [Audiologist/Admin Pages](#audiologistadmin-pages)
- [Common](#common)
- [Relogin-popup](#relogin-popup)
- [Services](#services)
- [404](#404)
- [Logo](#logo)

## Location

This will explain the hierarchy of the folders/files in: client/src/app

---

## Home

When you start the application you are presented with the home component in /home/

---

## Survey

Upon starting a survey you ar first taken to the appointments component in /appointments/

After selecting any of the options you will move through the following components:
- /ts-screener/
- /ths/
- /tfi/ <---------- Only if the first question in ts screener is not NO
- /patient-summary/

---

## After Patient Summary Tinnitus Exercises

From /patient-summary/ there is a 'TINNITUS EXERCISES' button at the bottom, this will take you to /landing/  
You then have access to the following pages/components:
- /pa/
- /ct/
- /mindfulness/
- /gm/
- /relaxation/
- /sleep/
- /sound/
- /faq/

---

## Logging In

The 'Log In' and 'Audiologist Log In' buttons on many pages will take you to /audiologist-login/  
If you are already logged in, or successfully log in, then you will be redirected to [/patient-login/](#creatingselecting-a-patient)  
Logging in will call /services/server-authentication.service.ts to talk to server-api.service.ts, explained in the [Services](#services) section below.  
You may use either Audiologist or Admin login credentials here. The permissions will be set according to the server response upon successful login. The [/audiologist-navigation/](#audiologistadmin-pages) component will use those permissions to display the appropriate options.

---

## Creating/Selecting a Patient

The /patient-login/ component will check to see if there are survey results in sessionStorage with no patient ID attached to them.  
If this is the case, /patient-login/ will allow the user to create a new patient or select an existing patient to attach the results to, then load [/audiologist-navigation/](#audiologistadmin-pages)  
If this is not the case, (e.g. no survey results in sessionStorage), it will immediately redirect you to [/audiologist-navigation/](#audiologistadmin-pages)

---

## Audiologist/Admin Pages

The /audiologist-navigation/ component is used for either type of user.

There are three possible states: No data loaded, data from completing the survey, or data loaded from the database. ngOnInit will determine which of the first two states is true. The third state can only be activated from within this component.  
/audiologist-navigation/navigation-aids.ts determines what tabs are available as well as which tab is selected.

- /audiologist-summary/ -- Displays appointment data in a one page summary for the Audiologist.
- /audiogram/ -- /otoscopy/ -- /tympanometry/ -- These are all displayed together on the Tests tab, they allow the Audiologist to record test results.
- /notes/ -- Displays the loaded patients notes, and allows updating them.
- /customer-search/ -- Search for patient appointments by patient ID. Selecting load on an appointment will open that appointment summary, and allow changing the patient notes.
- /users/ -- Allows the Admin to create a new user.
- /current-users/ -- Displays all users.
- /admin-patients-list/ -- Lists all patients for quick review of notes and CRUD.
- /my-account/ -- Allows a user to change their password.

---

## Common

This contains several items:
- audiologist-resource-strings.ts -- Unused
- base-url.ts -- The url where the server is running is entered here for use in the app.
- clear-data.ts -- /clear-data-modal/ -- There are two functions, either simply clear sessionStorage, or ask the user first. An example use is in /landing/ when you try to start a new survey.
- custom-resource-strings.ts -- Strings associated with their respective surveys. Also used in summaries.
- utilities.ts -- Used to encrypt and decrypt data saved to sessionStorage.

---

## Relogin-popup

/relogin-popup/ is used by /services/error-handling.ts when an attempt is made requiring a valid session, but the session has expired for any reason. This allows the user to immediately log in and begin a new session so that they can continue without going to a different page.

---

## Services

Collection of services for various components and api communication.  
Highlights:
- server-api -- Provides GET, POST, and DELETE functions. Call this when creating a service for a new feature that needs to communicate with the server.
- error-handling -- Used by server-api when the server responds with anything but success.
- notification -- Used throughout app to display snackbar notifications.
- router-guards -- Prevent or reroute attempts to access a route we don't want them to go for some reason.
- Other services are used by components to either store data, or intermediaries between them and server-api.

---

## 404

/no-content/ is used to display the 404 error page.

---

## Logo

/logo/ -- Unused
