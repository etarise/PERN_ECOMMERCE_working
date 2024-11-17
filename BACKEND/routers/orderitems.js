const express = require("express");
const router = express.Router();
const pool = require("./db");

//CREATE A orderitem
router.post(`/`, async (req, res) => {
  try {
    const { quantity, productid } = req.body;
    const newOrderItem = await pool.query(
      "INSERT INTO orderitems (quantity,productid) values ($1,$2) RETURNING *",
      [quantity, productid]
    );
    res.json(newOrderItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
