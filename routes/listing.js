const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../views/middleware.js");
const listingController = require("../Controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ dest: 'uploads/' })

  //New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn,  validateListing,
  upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn, isOwner,
  upload.single("listing(image)"),
  validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



  //Create Route
router.post("/",isLoggedIn,  validateListing,
    wrapAsync(listingController.createListing));    

  //Edit Route
router.get("/:id/edit",isLoggedIn,  isOwner, validateListing, 
  wrapAsync(listingController.renderEditForm));

module.exports = router;