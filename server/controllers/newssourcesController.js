const Sources = require("../models/newssourcesModel");

/**
 * Crea los usuarios
 *
 * @param {*} req
 * @param {*} res
 */
const newsSourcePost = (req, res) => {
  var sources = new Sources();

  sources.url = req.body.url;
  sources.nameSources = req.body.nameSources;

  sources.categoryID = req.body.categoryID;
  sources.userID = req.body.userID;

  if (sources.url && sources.nameSources && sources.categoryID) {
    sources.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the sources', err)
        res.json({
          error: 'There was an error saving the sources'
        });
      }
      res.status(201);//CREATEDa
      res.header({
        'location': `http://localhost:3000/api/newsSources/?id=${sources.id}`
      });
      res.json(sources);
    });
  } else {
    res.status(422);
    console.log('error while saving the sources')
    res.json({
      error: 'No valid data provided for sources'
    });
  }
};

/**
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const newsSourceGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Sources.findById(req.query.id, function (err, sources) {
      if (err) {
        res.status(404);
        console.log('error while queryting the sources', err)
        res.json({ error: "User doesnt exist" })
      }
      res.json(sources);
    });
  } else {
    // get all tasks
    Sources.find(function (err, sources) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(sources);
    });

  }
};

/**
 * Delete one task
 *
 * @param {*} req
 * @param {*} res
 */
const newsSourceDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Sources.findById(req.query.id, function (err, sources) {
      if (err) {
        res.status(500);
        console.log('error while queryting the sources', err)
        res.json({ error: "sources doesnt exist" })
      }
      //if the task exists
      if(sources) {
        sources.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the sources"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the sources', err)
        res.json({ error: "sources doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a sources ID" });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const newsSourcePatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    Sources.findById(req.query.id, function (err, sources) {
      if (err) {
        res.status(404);
        console.log('error while queryting the sources', err)
        res.json({ error: "sources doesnt exist" })
      }
      // update the task object (patch)
      sources.url = req.body.url ? req.body.url : task.url;
      sources.nameSources = req.body.nameSources ? req.body.nameSources : task.nameSources;
    
      sources.categoryID = req.body.categoryID ? req.body.categoryID : task.categoryID;
      sources.userID = req.body.userID ? req.body.userID : task.userID;
    
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      sources.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the sources', err)
          res.json({
            error: 'There was an error saving the sources'
          });
        }
        res.status(200); // OK
        res.json(sources);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "sources doesnt exist" })
  }
};

module.exports = {
  newsSourceGet,
  newsSourcePost,
  newsSourcePatch,
  newsSourceDelete
}