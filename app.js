require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("server is working");
});

app.use("/", require("./router/router"));
app.listen(PORT);
console.log(`Server is listening at http://localhost:${PORT}`);
