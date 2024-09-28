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

mongoose.connect(process.env.MONGODB);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

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
