const express = require("express");
const router = express.Router();
const pool = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var passport = require("passport");

//const api = process.env.API_URL;
const secret = process.env.API_SECRECT;
require("dotenv").config();
//CREATE A user
router.post(`/register`, async (req, res) => {
  console.log("create user");
  try {
    const {
      username,
      email,
      password,
      street,
      addressLine1,
      addressLine2,
      postcode,
      phone,
      IsAdmin,
      country,
      city,
    } = req.body;

    //check if user exist
    const user = await pool.query("SELECT * FROM users where email =$1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }
    const passwordHash = await bcrypt.hashSync(password, 10);
    console.log(password);
    console.log(passwordHash);
    console.log(req.body);
    const newUser = await pool.query(
      "INSERT INTO users (userName, email, passwordHash, street,addressLine1,addressLine2,postCode,phone,IsAdmin,country,city) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [
        username,
        email,
        passwordHash,
        street,
        addressLine1,
        addressLine2,
        postcode,
        phone,
        IsAdmin,
        country,
        city,
      ]
    );
    console.log("Registered successfully!");
    return res.json({ Status: "Success" });
    // return res.status(200).send("Registration successful");
  } catch (err) {
    console.error(err.message);
  }
});

//get all users

router.get(`/`, async (req, res) => {
  try {
    // const allUsers = await pool.query("select * from  users");
    const allUsers = await pool.query(
      "SELECT userName, email, street,addressLine1,addressLine2,postCode,phone,IsAdmin,country,city from  users"
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.log(err.message);
  }
});
//get a single  a user
router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("select * from  users  where userid=$1", [
      id,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//login
router.post("/login", async (req, res, next) => {
  console.log(`1--log in handler ${JSON.stringify(req.body)}`);

  passport.authenticate("local", (err, user) => {
    console.log(`3--yanetsa passport authenticate cba ${JSON.stringify(user)}`);

    if (err) {
      //handle
      return res.status(401).json({
        timestamp: Date.now(),
        msg: `Access denied.Username or password is incorrect`,
        code: 401,
      });
    }

    if (!user) {
      //handle
      return res.status(401).json({
        timestamp: Date.now(),
        msg: `Unauthorised User`,
        code: 401,
      });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({ Status: "Success" });
    });

    // res.status(200).json({ redirectTo: "/Dashboard" });
  })(req, res, next);
});
//

router.get(
  "/oauth2/redirect/facebook",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect("/register");
  }
);

router.get("/login/facebook", passport.authenticate("facebook"));

// router.get(`/logout`, async (req, res) => {
//   res.redirect("/login");
// });

// router.delete("/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       //console.log("in log oiut");
//       return next(err);
//     }
//     console.log("in log out");
//     return res.json({ Status: "Success" });
//   });
// });
// DELETE /api/auth/logout
router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        console.log("in log out");
        return res.json({ Status: "Success" });
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
