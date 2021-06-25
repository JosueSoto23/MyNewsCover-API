const User = require("../models/registerModel");

/**
 * Crea los usuarios
 *
 * @param {*} req
 * @param {*} res
 */
const userPost = (req, res) => {
  var user = new User();
  
  user.name = req.body.name;
  user.lastName = req.body.lastName;

  user.email = req.body.email;
  user.password = req.body.password;

  user.address1 = req.body.address1;
  user.address2 = req.body.address2;

  user.country = req.body.country;
  user.city = req.body.city;

  user.postalCode = req.body.postalCode;
  user.phoneNumber = req.body.phoneNumber;

  if (user.name && user.lastName && user.email && user.password && user.address1 && user.address2 && user.country && user.city && user.postalCode && user.phoneNumber) {
    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the user', err)
        res.json({
          error: 'There was an error saving the user'
        });
      }
      res.status(201);//CREATEDa
      res.header({
        'location': `http://localhost:3000/api/users/?id=${user.id}`
      });
      res.json(user);
    });
  } else {
    res.status(422);
    console.log('error while saving the user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};

/**
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const userGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      res.json(user);
    });
  } else {
    // get all tasks
    User.find(function (err, user) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(user);
    });

  }
};

/**
 * Delete one task
 *
 * @param {*} req
 * @param {*} res
 */
const userDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(500);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      //if the task exists
      if(user) {
        user.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the user"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a User ID" });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const userPatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }

      // update the task object (patch)
      user.name = req.body.name ? req.body.name : task.name;
      user.code = req.body.code ? req.body.code : task.code;

      user.career = req.body.career ? req.body.career : task.career;
      user.credits = req.body.credits ? req.body.credits : task.credits;
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      user.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the user', err)
          res.json({
            error: 'There was an error saving the user'
          });
        }
        res.status(200); // OK
        res.json(user);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "User doesnt exist" })
  }
};

module.exports = {
  userGet,
  userPost,
  userPatch,
  userDelete
}