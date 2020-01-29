// require packages
const mongoose = require("mongoose");
const db = require("../models");
var faker = require('faker');

// set up connection to db and connect to it
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/db-queries';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// loop to seed database using the faker package
for(let i = 0; i < 10000; i++) {
  var streetAddress = faker.address.streetAddress();
  var city = faker.address.city();
  var state = faker.address.state();
  var stateAbbr = faker.address.stateAbbr();
  var zipcode = faker.address.zipCode();

  var lat = faker.address.latitude();
  var long = faker.address.longitude();

  // create object to send to db
  var obj = {
    city: city,
    state: state,
    stateAbbr: stateAbbr,
    streetAddress: streetAddress,
    latitude: lat,
    longitude: long,
    zipcode: parseInt(zipcode)
  }

  // create document in mongo collection
  db.Location.create(obj)
    .then(addedLocation => { 
      // console.log(addedLocation)
    })
    .catch(err => {
      console.log(err);
    })
}

// setTimeout to disconnect from database after 30 seconds
setTimeout(
  function() {
    mongoose.disconnect(function(err) {
      if (err) throw err;
      console.log('Done importing. Disconnected.');
    });
  },1000*30);