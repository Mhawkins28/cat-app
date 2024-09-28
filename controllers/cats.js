const Cat = require("../models/Cat");

const getAllCats = async (req, res) => {
  try {
    const allCats = await Cat.find();
    console.log(allCats)
    res.render("cats/index", { cats: allCats });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

const calculateAge = (birthday) => {
  const diff = Date.now() - new Date(birthday).getTime(); // Difference in milliseconds
  const ageDate = new Date(diff); // Convert the difference to a Date object
  return Math.abs(ageDate.getUTCFullYear() - 1970); // Calculate the year difference from the epoch
};

const getOneCat = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    const age = calculateAge(cat.birthday);
    res.render("cats/detail", { cat, age });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

const getNewForm = (req, res) => {
  res.render("cats/new");
};

const createCat = async (req, res) => {
  if (req.body.likesPets) {
    req.body.likesPets = true;
  } else {
    req.body.likesPets = false;
  }

  try {
    await Cat.create(req.body);
    res.redirect("/cats");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCat = async (req, res) => {
  try {
    await Cat.findByIdAndDelete(req.params.id);
    res.redirect("/cats");
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
};

const getEditForm = async (req, res) => {
  try {
    const catToEdit = await Cat.findById(req.params.id);
    res.render("cats/edit", { cat: catToEdit });
  } catch (err) {
    console.log(err);
    res.redirect(`/`);
  }
};

const editCat = async (req, res) => {
  try {
    if (req.body.likesPets === "on") {
      req.body.likesPets = true;
    } else {
      req.body.likesPets = false;
    }

    await Cat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/cats/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/cats/${req.params.id}`);
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createCat,
  deleteCat,
  editCat,
  getNewForm,
  getEditForm,
};
