const router = require("express").Router();
const locationsController = require('../../controllers/locationsController');

// "/api/location"
router.route("/")
  .get(locationsController.findAll)
	.post(locationsController.add);

// "/api/location/seed"
router.route("/seed")
	.get(locationsController.seed);	

// "/api/location/:id"
router.route("/:id")
  .delete(locationsController.remove)
	.get(locationsController.findById)
	.put(locationsController.update);

// "/api/location/search/:query"
router.route("/search/:query")
	.post(locationsController.search);

module.exports = router;