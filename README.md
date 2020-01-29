# MERN Demo App

## Goal
To create a Full-Stack MERN app to demonstrate CRUD functionality and competence of various technologies

## Technologies Used:
- React w/ Material UI
- Express.js
- Node.js
- mongoDB with Mongoose
- mLab and Heroku
- Faker
- Axios

## Installing the App Locally
Requirements: *You will need Node.js and mongo installed on your computer.*

1. Navigate to the directory where you would like to download the demo files and run:
 `git clone git@github.com:v-tank/Demo.git`
2. `yarn install` in the root directory of the cloned repo
3. `cd client && yarn install`
4. Create a local mongoDB database called `db-queries`.
5. Navigate back up to the root directory and run `yarn start` to start the server and to run the React app. You will need to have `mongod` running in another terminal window.
6. Using Postman or any other API Dev Environment, hit the following `GET` route to seed your local database: `http://localhost:3001/api/location/seed`
7. Refresh the front-end to populate the table.
8. Enjoy!

## Running the Deployed App
Navigate to [https://mapsdemoapp.herokuapp.com/](https://mapsdemoapp.herokuapp.com/) to run and test the deployed version of the app.

## Skills Utilized
- REST API creation and consumption for CRUD functionality
- MVC architecture
- React with Material-UI, JS, CSS
- MongoDB
  - Indexing for faster queries
- Express / Node server
  - Debouncing
- Git
