const express = require("express");
const cors = require("cors");
const productsRoutes = require("./src/routes/productsRoutes");
const sequelize = require("./src/config/db");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
// Enable CORS
app.use(cors());
app.use("/inventories", productsRoutes);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// Create the products table in the database if it doesn't exist

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
