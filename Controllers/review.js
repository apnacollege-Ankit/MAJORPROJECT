const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res) =>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing._id}`);
    // console.log("new review saved");
    // res.send("new review saved");
};

module.exports.destroyReview = async (req, res) => {
    let{id, reviewid} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewid}});
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "New Review Deleted");
    res.redirect(`/listings/${id}`);
};