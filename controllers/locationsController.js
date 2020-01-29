// import db and faker package
const db = require('../models');
var faker = require('faker');

// export functions that handle tasks based on routes that are hit
module.exports = {
	// function to add a location that's sent from the frontend through the req.body
	add: function(req, res) {
		// console.log(req.body);

		// create a doc in db using the sent object
		db.Location.create(req.body)
			.then(addedLocation => {
				// send back created location to frontend for confirmation as JSON object
				res.json(addedLocation);
			})
			.catch(err => {
				// log errors if any
				console.log(err);
			});
	},
	// function to find all objects in database and return the first 1000 in the collection
	findAll: function(req, res) {
		db.Location.find({}).limit(1000).then(locations => {
				res.json(locations); // send back an array of objects with the first 1000 locations in the db
		});
	},
	// function to find and return a location by its ID
	findById: function(req, res) {
		db.Location.find({_id: req.params.id}).then(foundLocation => {
			res.json(foundLocation);
		})
	},
	// function to remove a document from the db
	remove: function(req, res) {
		db.Location.remove({_id: req.params.id}).then(deleted => {
			res.json(deleted); // send back the deleted doc from the db
		})
	},
	// function that searches for entered text in the search box. The query is sent as a URL parameter, thus we can access it using req.params.query.
	search: function(req, res) {
		// console.log(`Searching for ${req.params.query}...`);

		// the following query searches for entered text, scores the responses based on a match %, sorts in descending order, and returns the results as an array of JSON objects
		db.Location.find({$text: {$search: `"${req.params.query}"`}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}}).then(locations => {
			res.json(locations);
		});
	},
	// route to seed the database using the Faker package
	seed: function(req, res) {
		console.log("Seeding...");
		var max = 10000;

		for(let i = 0; i < max; i++) {
			var streetAddress = faker.address.streetAddress();
			var city = faker.address.city();
			var state = faker.address.state();
			var stateAbbr = faker.address.stateAbbr();
			var zipcode = faker.address.zipCode();

			var lat = faker.address.latitude();
			var long = faker.address.longitude();

			var obj = {
				city: city,
				state: state,
				stateAbbr: stateAbbr,
				streetAddress: streetAddress,
				latitude: lat,
				longitude: long,
				zipcode: parseInt(zipcode)
			}

			// console.log(obj);

			db.Location.create(obj)
				.then(addedLocation => {
					// console.log(addedLocation)
				})
				.catch(err => {
					console.log(err);
				});

			if (i === max - 1) {
				res.json({"status": "OK"});
			}
		}
		console.log("Done.");
	},
	// function to update a doc in the database based on an ID and an object sent via the req.body
	update: function(req, res) {
		db.Location.update(
			{_id: req.params.id},
			{$set: req.body}
		).then(updatedLocation => {
			res.json(updatedLocation); // returns the updated doc as JSON to frontend
		})
	}
}
