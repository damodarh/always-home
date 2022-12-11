const express = require("express");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Property = require("../../models/Property");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage: storage });

// @route GET api/properties
// @desc Get all properties
// @access Public
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();
    return res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/*GET - show property based on id*/
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id });

    if (!property) return res.status(404).json({ msg: "Property not found" });
    return res.json(property);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Property not found" });
    res.status(500).send("Server error");
  }
});

// @route POST api/properties
// @desc Create a property
// @access Private
router.post("/", [auth, upload.array("images")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

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
    city,
    state,
    country,
    zipCode,
    amenities,
  } = req.body;

  //Build property object
  const propertyFields = {};
  propertyFields.user = req.user.id;
  if (title) propertyFields.title = title;
  if (host) propertyFields.host = host;
  if (reviews) {
    propertyFields.reviews = [];
    reviews.map((review) => propertyFields.reviews.push(review));
  }
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
  if (city) propertyFields.city = city;
  if (state) propertyFields.state = state;
  if (country) propertyFields.country = country;
  if (zipCode) propertyFields.zipCode = zipCode;
  propertyFields.amenities = [];
  if (amenities) {
    amenities
      .split(",")
      .map((amenity) => propertyFields.amenities.push(amenity));
  }

  propertyFields.images = [];
  if (req.files) {
    req.files.map((file) => {
      const obj = {
        data: fs.readFileSync(
          path.join("./client/public/uploads/" + file.filename)
        ),
        contentType: file.mimetype,
      };
      propertyFields.images.push(obj);
    });
  }

  try {
    let property = new Property(propertyFields);
    await property.save();
    return res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* POST - Update/Edit an existing property */
router.post("/:id", [auth, upload.array("images")], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { pricePerNight, cleaningFee, serviceFee, avgCost, amenities } =
    req.body;

  //Build property object
  const propertyFields = {};
  propertyFields.user = req.user.id;
  if (pricePerNight) propertyFields.pricePerNight = pricePerNight;
  if (cleaningFee) propertyFields.cleaningFee = cleaningFee;
  if (serviceFee) propertyFields.serviceFee = serviceFee;
  if (avgCost) propertyFields.avgCost = avgCost;
  if (amenities) propertyFields.amenities = amenities;

  propertyFields.images = [];
  if (req.files) {
    req.files.map((file) => {
      const obj = {
        data: fs.readFileSync(
          path.join("./client/public/uploads/" + file.filename)
        ),
        contentType: file.mimetype,
      };
      propertyFields.images.push(obj);
    });
  }

  try {
    let property = await Property.findOne({ user: req.user.id });
    if (property) {
      property = await Property.findOneAndUpdate(
        { user: req.user.id },
        { $set: propertyFields },
        { new: true }
      );
      return res.json(property);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* DELETE - (Soft) Delete any one property */
router.delete("/:id", auth, async (req, res) => {
  try {
    let property = await Property.findOne({ _id: req.params.id });

    if (!property) return res.status(404).json({ msg: "Property not found" });
    property.available = false;
    property = await Property.findOneAndUpdate(
      { user: req.user.id },
      { $set: property },
      { new: true }
    );
    return res.status(200).send("Property taken off market succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* PUT - Mark property as available */
router.put("/available/:id", auth, async (req, res) => {
  try {
    let property = await Property.findOne({ _id: req.params.id });

    if (!property) return res.status(404).json({ msg: "Property not found" });
    property.available = true;
    property = await Property.findOneAndUpdate(
      { user: req.user.id },
      { $set: property },
      { new: true }
    );
    return res.status(200).send("Property is back on the market!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* GET - Get favorite properties */
router.get("/favorites/:favorites", auth, async (req, res) => {
  try {
    const properties = await Property.find({
      _id: { $in: req.params.favorites.split(',') },
    });
    if (!properties.length)
      return res.status(404).json({ msg: "No favorites found" });
    return res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
