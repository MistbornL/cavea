const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Initialize database connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const Product = sequelize.define(
  "Product",
  {
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
    },
  },
  {
    schema: "Products",
  }
);

// Create the products table in the database if it doesn't exist
Product.sync();
// Enable CORS
app.use(cors());

// Delete a product
app.delete("/products/:id", async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  await product.destroy();
  res.json({ message: "Product deleted successfully" });
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
