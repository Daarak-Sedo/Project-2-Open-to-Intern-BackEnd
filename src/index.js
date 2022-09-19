const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const multer = require("multer")
const { default: mongoose } = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(multer().any())
// app.use(bodyParser.urlencoded ({extented : true}))




mongoose.connect("mongodb+srv://Jyoti273-db:djukOqR9QbI5Itvc@cluster0.nzuylps.mongodb.net/Project2-InterCollege-db", {
  useNewUrlParser: true
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));



app.use("/", route);



app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});








