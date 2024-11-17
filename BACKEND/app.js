const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const api = process.env.API_URL;
const cors = require("cors");
const app = express();
const pool = require("./routers/db");
const data = require("./helpers/dbqueries");
const productsRouter = require("./routers/products");
const categoriesRouter = require("./routers/category");
const usersRouter = require("./routers/user");
const ordersRouter = require("./routers/order");
const orderitemsRouter = require("./routers/orderitems");
const authJwt = require("./helpers/jwt");
const errorhandler = require("./helpers/error-handler");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook");
const session = require("express-session");
const bcrypt = require("bcryptjs");
//midleware

app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 24 },
  })
);
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
//app.use(authJwt);
app.use(errorhandler);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log(`2--local strategy veryfy cb ${JSON.stringify(email)}`);

      pool.query(
        `SELECT * FROM users WHERE email= $1;`,
        [email],
        (err, results) => {
          if (err) {
            throw err;
          }
          // console.log(" before if statement");
          // console.log(results.rows);
          if (results.rows.length > 0) {
            const user = results.rows[0];
            // console.log(password);
            // console.log(results.rows[0].passwordhash);

            bcrypt.compare(password, user.passwordhash, (err, isMatch) => {
              if (err) {
                throw err;
              }

              if (isMatch) {
                console.log("is match");
                return done(null, user);
              } else {
                console.log("is not match");
                return done(
                  "Password or username is incorrect,Please try again",
                  null
                );
              }
            });

            //return done(null, user);
          } else {
            return done(null, false, { message: "Email is not registered" });
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(`$4--Serialize user: ${JSON.stringify(user.userid)}`);
  done(null, user.userid);
});

passport.deserializeUser((id, done) => {
  console.log(`Deserialize user: ${JSON.stringify(id)}`);
  pool.query(`SELECT * from users WHERE id = $1`, [
    id,
    (err, results) => {
      if (err) {
        throw err;
      }

      if (results.rows.length > 0) {
        const user = results.rows[0];
        return done(null, { id: user.userid, email: user.email });
      } else {
        return done(new Error("No user with id if found"));
      }

      //return done(null, results.rows[0]);
    },
  ]);
});

/////////////////////////////////FACEBOOK STRATEGY ////////////////////////////////////////////////////////////////////////////////
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "http://localhost:5000/auth/facebook/callback",
//       profileFields: ["id", "displayName", "name"],
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       console, log("in facebook");
//       console.log(profile);
//       return done(null, profile);
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env["FACEBOOK_APP_ID"],
      clientSecret: process.env["FACEBOOK_APP_SECRET"],
      callbackURL: "http://localhost:5000/",
    },
    function (accessToken, refreshToken, profile, cb) {
      db.get(
        "SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?",
        ["https://www.facebook.com", profile.id],
        function (err, cred) {
          if (err) {
            return cb(err);
          }
          if (!cred) {
            // The Facebook account has not logged in to this app before.  Create a
            // new user record and link it to the Facebook account.
            db.run(
              "INSERT INTO users (name) VALUES (?)",
              [profile.displayName],
              function (err) {
                if (err) {
                  return cb(err);
                }

                var id = this.lastID;
                db.run(
                  "INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)",
                  [id, "https://www.facebook.com", profile.id],
                  function (err) {
                    if (err) {
                      return cb(err);
                    }
                    var user = {
                      id: id.toString(),
                      name: profile.displayName,
                    };
                    return cb(null, user);
                  }
                );
              }
            );
          } else {
            // The Facebook account has previously logged in to the app.  Get the
            // user record linked to the Facebook account and log the user in.
            db.get(
              "SELECT * FROM users WHERE id = ?",
              [cred.user_id],
              function (err, user) {
                if (err) {
                  return cb(err);
                }
                if (!user) {
                  return cb(null, false);
                }
                return cb(null, user);
              }
            );
          }
        }
      );
    }
  )
);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//passport.use("local", passportConfig);

app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
//ROUTERS
app.use(`${api}/products`, productsRouter);
app.use(`${api}/category`, categoriesRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/order`, ordersRouter);
app.use(`${api}/orderitems`, orderitemsRouter);

app.listen(5000, () => {
  console.log(api);
  console.log("server is running at http://localhost:5000");
});
