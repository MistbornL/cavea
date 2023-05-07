const { Product } = require("../models/Product");
const products = [];
locations = [
  "მთავარი ოფისი",
  "კავეა გალერია",
  " კავეა თბილისი მოლი",
  " კავეა ისთ ფოინთი",
  " კავეა სითი მოლი",
];
// // Generate 30000 products with random data
// for (let i = 0; i < 300000; i++) {
//   products.push({
//     location: locations[Math.floor(Math.random() * locations.length)],
//     name: "Product " + i,
//     price: Math.floor(Math.random() * 1000) + 1,
//   });
// }

// // Insert products into the database using bulkCreate
// Product.bulkCreate(products)
//   .then(() => {
//     console.log("Products inserted successfully");
//   })
//   .catch((error) => {
//     console.error("Error inserting products:", error);
//   });

// Product.destroy({ where: {} })
//   .then(() => console.log("All products have been deleted"))
//   .catch((error) => console.error(error));

exports.getProducts = async (req, res) => {
  try {
    const { location } = req.query;

    let filters = {};
    if (location) {
      filters.location = location;
    }

    const products = await Product.findAll({ where: filters });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { location, name, price } = req.body;
    const product = await Product.create({ location, name, price });
    res.json(product);
    console.log("creation success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.updateProduct = async (req, res) => {
//   try {
//     const { location, name, price } = req.body;
//     const product = await Product.findByPk(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     product.location = location;
//     product.name = name;
//     product.price = price;
//     await product.save();
//     res.json(product);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
