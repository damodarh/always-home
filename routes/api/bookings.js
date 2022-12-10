const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Booking = require("../../models/Booking");

// @route POST api/booking
// @desc Create a booking
// @access Private
router.post("/", auth , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
  
    const {
      title,
      city,
      guest_first_name,
      guest_last_name,
      host_first_name,
      host_last_name,
      check_in_date,
      check_out_date,
      booking_status,
    } = req.body;
  
    //Build property object
    const bookingFields = {};
    bookingFields.user = req.user.id;
    if (title) bookingFields.title = title;
    if (city) bookingFields.city = city;
    if (guest_first_name) bookingFields.guest_first_name = guest_first_name;
    if (guest_last_name) bookingFields.guest_last_name = guest_last_name;
    if (host_first_name) bookingFields.host_first_name = host_first_name;
    if (host_last_name) bookingFields.host_last_name = host_last_name;
    if (check_in_date) bookingFields.check_in_date = check_in_date;
    if (check_out_date) bookingFields.check_out_date = check_out_date;
    if (booking_status) bookingFields.booking_status = booking_status;

    try {
      let booking = new Booking(bookingFields);
      await booking.save();
      return res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


/*GET - show all booking for a user*/
router.get("/:id", async (req, res) => {
    try {
        const booking = await Booking.find({ _id: req.params.id });
        if (!booking) return res.status(404).json({ msg: "Booking not found" });
        if (req.user.id === booking.user) return res.json(booking);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "Booking not found" });
      res.status(500).send("Server error");
    }
});

/* POST - Update/Edit an existing reservation based on userid */
router.post("/:id", auth, async (req, res) => {
    const { check_in_date, check_out_date } =
      req.body;
  
    //Build booking object
    const bookingFields = {};
    bookingFields.user = req.user.id;
    if (check_in_date) bookingFields.check_in_date = check_in_date;
    if (check_out_date) bookingFields.check_out_date = check_out_date;
    
    try {
      let booking = await Booking.find({ user: req.user.id });
      if (booking && booking._id === req.params.id) {
        booking = await Booking.findOneAndUpdate(
          {_id: req.params.id},
          { $set: bookingFields },
          { new: true }
        );
        return res.json(booking);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

/* DELETE - (Soft) Delete any one booking based on userid */
router.delete("/:id", auth, async (req, res) => {
    try {
      let booking = await Booking.find({ _id: req.user.id });
  
      if (!booking) return res.status(404).json({ msg: "Property not found" });
      if (booking._id === req.params.id){
      booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        { $set: booking },
        { new: true }
      );
      return res.json(booking);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;

