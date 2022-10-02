const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const route = require("./routes/route");
const multer = require("multer");
const app = express();

app.use(bodyParser.json());
app.use(multer().any());

const url = "mongodb+srv://meenakshiSuryavanshi:ZVnFmXr4hAJCCKdL@cluster0.b80r4d1.mongodb.net/project-2"
const port = process.env.PORT || 3001;

mongoose.connect(url ,{ useNewUrlParser: true })
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
app.use(function(req, res, next){
  res.setHeader('Access-Conrol-Allow-Origin', '*')
  next()
})

app.listen(port, function () {
  console.log("Express app running on port " + port);
});
