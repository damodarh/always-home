const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Property = require("../../models/Property");

// @route GET api/properties
// @desc Get all properties
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Property.find();
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/profile
// @desc Create or update a user profile
// @access Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  /*
      {
        title: '',
        address: {
            city: '',
            state: '',
            country: '',
            zip_code: 0,
        },
        host: '',
        reviews: 0,
        pricePerNight: 0,
        cleaningFee: 0,
        serviceFee: 0,
        amenities: [],
        bedroom: 0,
        beds: 0,
        bath: 0,
        images: [],
        rating: 0,
        avgCost: 0,
        availability: '',
        distance: '',
        favorite: false
    }
      */

  const {
    title,
    host,
    reviews,
    pricePerNight,
    cleaningFee,
    serviceFee,
    bedroom,
    beds,
    bath,
    rating,
    avgCost,
    availability,
    distance,
    favorite,
  } = req.body;

  //Build property object
  const propertyFields = {};
  propertyFields.user = req.user.id;
  if (title) propertyFields.title = title;
  if (host) propertyFields.host = host;
  if (reviews) propertyFields.reviews = reviews;
  if (pricePerNight) propertyFields.pricePerNight = pricePerNight;
  if (cleaningFee) propertyFields.cleaningFee = cleaningFee;
  if (serviceFee) propertyFields.serviceFee = serviceFee;
  if (bedroom) propertyFields.bedroom = bedroom;
  if (beds) propertyFields.beds = beds;
  if (bath) propertyFields.bath = bath;
  if (rating) propertyFields.rating = rating;
  if (avgCost) propertyFields.avgCost = avgCost;
  if (availability) propertyFields.availability = availability;
  if (distance) propertyFields.distance = distance;
  if (favorite) propertyFields.favorite = favorite;

  try {
    let property = await Property.findOne({ user: req.user.id });
    if (property) {
      //Update
      property = await Property.findOneAndUpdate(
        { user: req.user.id },
        { $set: propertyFields },
        { new: true }
      );
      return res.json(property);
    }

    property = new Property(propertyFields);
    await property.save();
    return res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
