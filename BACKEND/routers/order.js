const express = require("express");
const router = express.Router();
const pool = require("./db");

//CREATE A category
router.post(`/`, async (req, res) => {
  try {
    const {
      shippingaddress1,
      shippingadress2,
      city,
      zip,
      phone,
      status,
      totalprice,
      dateordered,
      orderitemsid,
      userid,
    } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO orders (shippingaddress1,shippingadress2,city,zip,phone,status,totalprice,dateordered,orderitemsid,userid) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [
        shippingaddress1,
        shippingadress2,
        city,
        zip,
        phone,
        status,
        totalprice,
        dateordered,
        orderitemsid,
        userid,
      ]
    );
    res.json(newOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all orders

router.get(`/`, async (req, res) => {
  try {
    console.log("in here");
    const allOrders = await pool.query("select * from  orders");
    res.json(allOrders.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get(`/get/userorders/:userid`, async (req, res) => {
  try {
    const { userid } = req.params;
    const category = await pool.query(
      "select * from  orders  where userid=$1",
      [userid]
    );
    res.json(category.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
