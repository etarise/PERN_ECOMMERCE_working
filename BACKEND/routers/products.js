const express = require("express");
const router = express.Router();
const pool = require("./db");
const multer = require("multer");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

//ROUTES

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

//CREATE A PRODUCT
router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");
    const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
    const {
      productname,
      richdescription,
      fileName = req.file.filename,
      images,
      brand,
      price,
      categoryid,
    } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (productname,richdescription,image,images,brand,price,categoryid) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [
        productname,
        richdescription,
        `${basePath} ${fileName}`,
        images,
        brand,
        price,
        categoryid,
      ]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all products

router.get(`/`, async (req, res) => {
  try {
    console.log("here");
    const allProducts = await pool.query("select * from  products");
    res.json(allProducts.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// //get a single product
router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "select * from  products where productid = $1",
      [id]
    );
    res.json(product.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// //update a product

router.put(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      productname,
      richdescription,
      image,
      images,
      brand,
      price,
      categoryid,
    } = req.body;
    const UpdateProduct = await pool.query(
      "Update products set productname =$1,richdescription=$2,image =$3,images=$4,brand=$5,price=$6,categoryid=$7 where productid=$8 ",
      [
        productname,
        richdescription,
        image,
        images,
        brand,
        price,
        categoryid,
        id,
      ]
    );

    res.json("Product was updated");
  } catch (err) {
    console.log(err.message);
  }
});

// //delete a product
router.delete(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    //const { product_name, countInStock, image } = req.body;
    const DeleteProduct = await pool.query(
      "Delete  from products  where productid=$1 ",
      [id]
    );

    res.json("Product was delete");
  } catch (err) {
    console.log(err.message);
  }
});

// //get a  product count
router.get(`/:id/count`, async (req, res) => {
  try {
    const product = await pool.query("select * from  products");
    console.log(product);
    res.json(product.rowCount);
  } catch (err) {
    console.log(err.message);
  }
});

// //get a single product
router.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      "select * from  products where productid = $1",
      [id]
    );
    res.json(product.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// //update a gallary  images

router.put(
  `/gallery-images/:id`,
  uploadOptions.array("images", 10),
  async (req, res) => {
    try {
      //console.log("here");
      const basePath = `${req.protocol}://${req.get("host")}/public/upload/`;
      const files = req.files;
      //console.log(files);
      let imagesPaths = [];
      const { id } = req.params;

      if (files) {
        files.map((file) => {
          imagesPaths.push(basePath + file.filename);
          //   imagesPaths.push(`${basePath}${file.fileName}`);
          // console.log(b);
        });
      }
      console.log(imagesPaths);
      const UpdateProduct = await pool.query(
        "Update products set  images=$1 where productid=$2 ",
        [imagesPaths, id]
      );

      res.json("Product was updated");
    } catch (err) {
      console.log(err.message);
    }
  }
);

module.exports = router;
