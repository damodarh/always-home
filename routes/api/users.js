const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route GET api/users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("name", "Please include your name"),
    check("email", "Please include a valid email address")
      .isEmail()
      .normalizeEmail(),
    check("password", "Password is required").exists(),
    check(
      "password",
      "Password must have atleast 6 characters, one upper case letter, one lower case letter, one number and one special character"
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isHost } = req.body;

    try {
      //see if user exists

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        isHost,
      });

      //encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //return json web token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT api/users/favorites
// @desc Add property to users favorites list
// @access Public
router.put("/favorites/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select("-password");
    if (!user.favorites) user.favorites = [];
    if (!user.favorites.includes(req.params.id)) {
      user.favorites.push(req.params.id);
      user = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $set: user },
        { new: true }
      );
    }

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/users/favorites
// @desc Remove property from users favorites list
// @access Public
router.put("/favorites/remove/:id", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.user.id }).select("-password");
    user.favorites.remove(req.params.id);
    user = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: user },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
