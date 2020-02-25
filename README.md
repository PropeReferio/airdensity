# Updating Firebase Database at Specific times
The majority of changes made to the project have been inside of the `server.js` file. 

*** Run `npm install` to install packages ***

Any packages that are missing from the above command will need to be ran individually. But for the most part, the above command should do the trick.

There were a few packages needed in order to complete the task at hand. They are:
- `Cron` - Which allows your server to perform cron jobs (A Cron job is an automated task set for a specific time). Currently the function is set to keep running so that it could be tested.

<a href="https://www.npmjs.com/package/node-cron">Take a look at this documentation</a> to learn more about the parameters

- `node-fetch` - Allows HTTP requests to be sent via node. 

- `firebase-admin` - Required in order to send data to the database from a node server. 

<a href="https://www.youtube.com/watch?v=Z87OZtIYC_0">Take a look at this video</a> to get the required config file for your project. 

*** Note *** Make sure NOT to keep this config file in a public facing repo 

-  `fs` - Allows you to read the config file and save it as an Object

I've removed my config file for security purposes. Also, you will want to store your API_Keys in environment variables on your heroku server. Heroku's console can be accessed by clicking "more" > "run console"

<a href="https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps">Helpful link here on creating envrionment variables</a>

Here's a working demo video of the results:
<a href="https://zoom.us/rec/share/wv5uPoPo9F9ObJ2R9GyEGYcxILz9aaa813Ua_PELzhqcHgYVCCUqrGCHRq1QsM6h?startTime=1582352080000"> Video </a>

*** Don't forget to add your creditials from firebase from the project ***


# AngularDensityAltitude

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
