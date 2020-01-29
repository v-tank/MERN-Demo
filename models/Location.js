const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define a location schema to keep data in collection organized; data must adhere to this schema
const locationSchema = new Schema({
	city: { type: String, required: true, index:true },
	latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  state: { type: String, required: true, index: true },
	stateAbbr: { type: String, required: true },
	streetAddress: { type: String, required: true, index: true },
	zipcode: { type: Number, required: true }
});

// index city, state, and streetAddress for quick searches
locationSchema.index({
	city: 'text',
	state: 'text',
	streetAddress: 'text'
});

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;