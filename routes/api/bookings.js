const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Booking = require("../../models/Booking");

// @route POST api/booking
// @desc Create a booking
// @access Private
router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    title,
    city,
    guestName,
    hostName,
    checkinDate,
    checkoutDate,
    bookingStatus,
  } = req.body;

  //Build property object
  const bookingFields = {};
  bookingFields.user = req.user.id;
  bookingFields.property = req.params.id;
  if (title) bookingFields.title = title;
  if (city) bookingFields.city = city;
  if (guestName) bookingFields.guestName = guestName;
  if (hostName) bookingFields.hostName = hostName;
  if (checkinDate) bookingFields.checkinDate = checkinDate;
  if (checkoutDate) bookingFields.checkoutDate = checkoutDate;
  if (bookingStatus) bookingFields.bookingStatus = bookingStatus;

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
router.get("/", auth, async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user.id });
    if (!booking.length)
      return res.status(404).json({ msg: "Booking not found" });
    if (booking[0].user.toString() === req.user.id) {
      return res.json(booking);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Booking not found" });
    res.status(500).send("Server error");
  }
});

/* POST - Update/Edit an existing reservation based on userid */
/*id - booking id*/
router.post("/:id", auth, async (req, res) => {
  const { check_in_date, check_out_date } = req.body;

  //Build booking object
  const bookingFields = {};
  bookingFields.user = req.user.id;
  if (check_in_date) bookingFields.check_in_date = check_in_date;
  if (check_out_date) bookingFields.check_out_date = check_out_date;

  try {
    let booking = await Booking.find({ user: req.user.id });
    if(!booking) return res.status(404).json({msg: 'No bookings have been made!'})
    if (booking[0].user.toString() === req.user.id) {
      let b = booking.find((book) => book._id.toString() === req.params.id.trim());
      console.log(b)
      if(!b) return res.status(404).json({msg: 'Booking not found!'})
      if (check_in_date) b.check_in_date = check_in_date;
      if (check_out_date) b.check_out_date = check_out_date;
      booking = await Booking.findOneAndUpdate(
        { _id: req.params.id },
        { $set: b },
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
/*id - booking id*/
router.delete("/:id", auth, async (req, res) => {
  try {
    let booking = await Booking.find({ user: req.user.id });
    console.log(booking)
    console.log(req.params.id)
    if (!booking) return res.status(404).json({ msg: "Booking not made!" });
    if(booking[0].user.toString() === req.user.id){
        let b = booking.find((book) => book._id.toString() === req.params.id.trim());  
        console.log(b)
        booking = await Booking.findOneAndRemove(
        { _id: req.params.id }
      );
      return res.json(booking);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
