// const db = require("./db");

const getUserByEmail = (req, res) => {
  const email = req.params.email;
  db.pool.query(
    `SELECT * FROM users WHERE email= $1;`,
    [email],
    (err,
    (results) => {
      if (err) {
        throw ee;
      }
      console.log(results.rows);
      res.status(200).json(results.rows);
    })
  );
};

// module.exports = getUserByEmail;

function errorhandler(err, req, res, next) {
  if (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = getUserByEmail;
