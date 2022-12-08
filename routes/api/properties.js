const express = require('express');
const auth = require('../../middleware/auth');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Property = require('../../models/Property');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb('Please upload images only.', false);
    }
};

let upload = multer({ storage, fileFilter });

// @route GET api/properties
// @desc Get all properties
// @access Public
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        return res.json(properties);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/*GET - show property based on id*/
router.get('/:id', async (req, res) => {
    try {
        const property = await Property.findOne({ id: req.params.id });

        if (!property)
            return res.status(404).json({ msg: 'Property not found' });
        return res.json(property);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId')
            return res.status(404).json({ msg: 'Property not found' });
        res.status(500).send('Server error');
    }
});

// @route POST api/property
// @desc Create or update a property
// @access Private
// TODO - photos here is to be the name of the input field in form where we will be uploading images <input type="file" name="photos" accept='image/*' multiple>
router.post('/', [auth, upload.array('images')], async (req, res) => {
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
        address,
        images,
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
    propertyFields.address = {};
    if (address) {
        if (address.city) propertyFields.address.city = address.city;
        if (address.state) propertyFields.address.state = address.state;
        if (address.country) propertyFields.address.country = address.country;
        if (address.zipCode) propertyFields.address.zipCode = address.zipCode;
    }
    propertyFields.images = {};
    if (images) {
    }

    try {
        // let property = await Property.findOne({ user: req.user.id });
        // if (property) {
        //     //Update
        //     property = await Property.findOneAndUpdate(
        //         { user: req.user.id },
        //         { $set: propertyFields },
        //         { new: true }
        //     );
        //     return res.json(property);
        // }

        let property = new Property(propertyFields);
        await property.save();
        return res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/* PUT - Update/Edit an existing property */
router.put('/:id', [auth, upload.single('images')], async (req, res) => {
    
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
        address,
    } = req.body;
    console.log(req.file)
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
    propertyFields.address = {};
    if (address) {
        if (address.city) propertyFields.address.city = address.city;
        if (address.state) propertyFields.address.state = address.state;
        if (address.country) propertyFields.address.country = address.country;
        if (address.zipCode) propertyFields.address.zipCode = address.zipCode;
    }
    propertyFields.images = {};
    
    try {
        let property = await Property.findOneAndUpdate(
            { user: req.params.id },
            { $set: req.body },
            { new: true }
        );
        return res.json(property);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/* DELETE - Delete any one property */
router.delete('/:id', auth, async (req, res) => {
    try {
        await Property.findOneAndRemove({ id: req.params.id });
        res.json({ msg: 'Property deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
