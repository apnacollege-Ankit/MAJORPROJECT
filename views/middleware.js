const Listing = require("../models/listing");
const Review = require("../models/review")
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const review = require("../models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
    } 
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = wrapAsync(async(req, res, next) => {
    let { id } = req.params;
    let  listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
});


module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    // console.log(result);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, result.error);
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    // console.log(result);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, result.error);
    } else {
        next();
    }
};

module.exports.isReviewAuthor = async(req, res, next) => {
    let { id ,reviewid } = req.params;
    let  listing = await Review.findById(reviewid);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


