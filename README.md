# coffeeFinder

## TypeScript Note

Full disclosure, I started off trying to make a TypeScript project with no prior knowledge of Typescript so the file format is what I'd ideally have, with the ts files in src and the compiled (tsc) files in dist. I went ahead and implemented the server is javascript out of time but I'll explain my thought process for the folder structure.

I did create the tsconfig.json file and started writing the controller in typescript before I decided to just go with regular javascript, but they are far from complete.

## Project Structure

Ideally, if I wrote the TypeScript, I would separate the *source* and *distribuable* files so that I could compile the typescript then run the nodeapp, but for all intents and purposes, we can ignore the **src** folder and **tsconfig.json** file.

| Name                 | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| **dist**             | Contains distributable from TypeScript output                                   |
| **dist/controllers** | Controllers define functions that respond to various http requests              |
| **dist/models**      | Models define Mongoose schemas used in storing and retrieving data from MongoDB |
| **dist/routes**      | Routes define responses to specified http request types                         |
| **node_modules**     | contains npm dependencies                                                       |
| **src**              | Contains typescript files (ideally)                                             |
| db.js                | Separate module for the mongoDB connection                                      |
| package.json         | Lists out npm dependencies                                                      |
| popualate.js         | A script I wrote to populate the db with locations.csv                          |
| server.js            | The base server app                                                             |
| tsconfig.json        | Config settings for compiling server code written in TypeScript                 |

## Database usage

Because I could use outside packages, I used MLab to create a sandbox MongoDB database and used mongoose to connect to it so that the data could presist between server stoppages. I felt that this was easy enough to implement and a better long term solution since it separates the data management service (database) and the application side services (the node app). 

For Find Nearest, I use mongodb's built in $nearSphere geospatial query to easily find the closes shop based on our loc field of [longitude, latitide].

## REST API Functionality/CRUD+findNearest

| API Function     | URL/Type                     | Notes                                               |
| ---------------- | ---------------------------- | --------------------------------------------------- |
| Create           | /shops, POST                 | Generic Create                                      |
| Read             | /shops/:coffeeShopId, GET    | Generic Read                                        |
| Update           | /shops/:coffeeShopId, PUT    | Will update whichever fields given
| Delete           | /shops/:coffeeShopId, DELETE | If you delete a shop that doesn't exist, it'll give back the normal response   |
| Find Nearest     | /shops/find, POST            | Geocodes address given and uses MongoDB built-in $near to find closest shop |
| Find All         | /shops, GET                  | Not specified in the instructions, but an intuitive and simple feature |

I want to note that for Find Nearest, if it's given a address without a city or state, geocoding might recognize it as a nonlocal address. I tried to localize addresses to San Francisco, but an example of an incorrect address is:

```
https://maps.googleapis.com/maps/api/geocode/json?address=%20270%207th%20St&components=country:US|locality:San+Francisco&key=AIzaSyCawyHgdHUG8d3PKug5ypnGXXmGjKe6kBY
```

## Testing

I personally did most of my testing through [postman](https://www.getpostman.com/). But for future testing, I would try to use a framework that also support typescript like Jest and using TSLint to catch code quality and style issues.

## Pre-Reqs

Packages used and installed through npm
* body-parser - Parses incoming request bodies (req.body) in middleware before my handlers interact with them
* express - Minimal web framework
* mongoose - Interface with MongoDB
* csv - To parse locations.csv
* request - To access Google's Geocoding rest api
* nodemon - Restarts node server when making file changes to make development easier

Typescript, ideally
* npm install -g typescript

## Getting Started

* Clone the repository
```
git clone https://github.com/xurichard/coffeeFinder.git
```

* Install dependencies

```
cd coffeeFinder
npm install
```

* If for some reason the db isn't populated, populate the db from locations.csv
```
node populate.js
```

* Run server
```
npm run
```
or
```
node server.js
```