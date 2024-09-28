const express = require("express"); 
const dotenv = require("dotenv"); 
const mongoose = require("mongoose");
const catController = require("./controllers/cats.js");

const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose
.set("strictQuery", true)
  .connect("mongodb://localhost:27017/catApp")
  .then((instance) => {
    console.log(`Connected on ${instance.connections[0].name}`);
  })
  .catch((err) => console.log(`Got an error see details, ${err}`));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {
  res.render("home");
});

app.get("/cats/new", catController.getNewForm);
app.get("/cats", catController.getAllCats);
app.get("/cats/:id", catController.getOneCat);
app.post("/cats", catController.createCat);
app.delete("/cats/:id", catController.deleteCat);
app.get("/cats/:id/edit", catController.getEditForm);
app.put("/cats/:id", catController.editCat);



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
