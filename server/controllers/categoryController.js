const Category = require("../models/categoryModel");

/**
 * Crea los usuarios
 *
 * @param {*} req
 * @param {*} res
 */
const categoryPost = (req, res) => {
  var category = new Category();

  category.nameCategory = req.body.nameCategory;
  
  if (category.nameCategory) {
    category.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the category', err)
        res.json({
          error: 'There was an error saving the category'
        });
      }
      res.status(201);//CREATEDa
      res.header({
        'location': `http://localhost:3000/api/categories/?id=${category.id}`
      });
      res.json(category);
    });
  } else {
    res.status(422);
    console.log('error while saving the category')
    res.json({
      error: 'No valid data provided for category'
    });
  }
};

/**
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const categoryGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(404);
        console.log('error while queryting the category', err)
        res.json({ error: "category doesnt exist" })
      }
      res.json(category);
    });
  } else {
    // get all tasks
    Category.find(function (err, category) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(category);
    });

  }
};

/**
 * Delete one task
 *
 * @param {*} req
 * @param {*} res
 */
const categoryDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(500);
        console.log('error while queryting the category', err)
        res.json({ error: "category doesnt exist" })
      }
      //if the task exists
      if(category) {
        category.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the category"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the category', err)
        res.json({ error: "category doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a category ID" });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const categoryPatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    Category.findById(req.query.id, function (err, category) {
      if (err) {
        res.status(404);
        console.log('error while queryting the category', err)
        res.json({ error: "category doesnt exist" })
      }

      // update the task object (patch)
      category.nameCategory = req.body.nameCategory ? req.body.nameCategory : task.nameCategory;
      
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      category.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the category', err)
          res.json({
            error: 'There was an error saving the category'
          });
        }
        res.status(200); // OK
        res.json(category);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "category doesnt exist" })
  }
};

module.exports = {
  categoryGet,
  categoryPost,
  categoryPatch,
  categoryDelete
}