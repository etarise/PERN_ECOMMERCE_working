const express = require("express");
const router = express.Router();
const pool = require("./db");

//CREATE A category
router.post(`/`, async (req, res) => {
  try {
    const { categoryname, color, icon, image } = req.body;
    const newCategory = await pool.query(
      "INSERT INTO category (categoryname,color,icon,image) values ($1,$2,$3,$4) RETURNING *",
      [categoryname, color, icon, image]
    );
    res.json(newCategory.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all categories

router.get(`/`, async (req, res) => {
  try {
    const allCategory = await pool.query("select * from  category");
    res.json(allCategory.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//delete a categorY
router.delete(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id);
    const DeleteCategory = await pool.query(
      "Delete  from category  where categoryid=$1 ",
      [id]
    );

    res.json("category was delete");
  } catch (err) {
    console.log(err.message);
  }
});

//get a single  a category
router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const category = await pool.query(
      "select * from  category  where categoryid=$1",
      [id]
    );
    res.json(category.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
// //update a category

router.put(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryname, color, icon, image } = req.body;
    const UpdateProduct = await pool.query(
      "Update category set categoryname =$1,color=$2,icon=$3,image =$4 where categoryid=$5 ",
      [categoryname, color, icon, image, id]
    );

    res.json("Category was updated");
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
