const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());

let url ="mongodb+srv://meenakshiSuryavanshi:ZVnFmXr4hAJCCKdL@cluster0.b80r4d1.mongodb.net/project-2";
let port = process.env.PORT || 3000;

mongoose.connect(url, {useNewUrlParser: true })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, function() {
  console.log("Express app running on port " + port);
});








