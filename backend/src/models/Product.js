const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

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
Product.sync();
module.exports = { Product };
