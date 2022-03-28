const app = require("./app");
require("dotenv").config();
const dbConnection = require("./server/config/db");

dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}...`);
});
