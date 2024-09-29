const Cat = require('../models/Cat');

const createComment = async (req, res) => {

  try {
    const foundCat = await Cat.findById(req.params.catId);
    if (req.body.uploadedBy === "") {
      delete req.body.uploadedBy;
    }
    foundCat.comments.push(req.body);
    await foundCat.save();
    res.redirect(`/cats/${req.params.catId}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/cats/${req.params.catId}`);
  }}


  const deleteComment = async (req, res) => {
    try {
      const { catId, commentId } = req.params;
      const cat = await Cat.findById(catId);
      if (!cat) {
        return res.status(404).json({ message: 'Cat not found' });
      }
      const commentExists = cat.comments.id(commentId);
      if (!commentExists) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      cat.comments.pull(commentId);
      await cat.save();
      res.redirect(`/cats/${catId}`);
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: 'Error deleting comment', error: err.message });
    }
  };
  
  
  
  


  module.exports = {
    createComment,
    deleteComment
  }