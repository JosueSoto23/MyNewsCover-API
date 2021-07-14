/**
 * Model connector
 */
const User = require("../models/registerModel");

/**
 * Creates an user
 *
 * @param {*} req Data required
 * @param {*} res Http status code
 */
const userPost = (req, res) => {
  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;

  user.email = req.body.email;
  user.password = req.body.password;

  user.address = req.body.address;
  user.address2 = req.body.address2;

  user.country = req.body.country;
  user.city = req.body.city;

  user.postalCode = req.body.postalCode;
  user.phoneNumber = req.body.phoneNumber;
  user.role = req.body.role;

  if (user.firstName && user.lastName && user.email && user.password && user.role) {
    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the user', err)
        res.json({
          error: 'There was an error saving the user'
        });
      }
      res.status(201); //CREATED
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
 * Gets all users
 *
 * @param {*} req Data required
 * @param {*} res Http status code 
 */
const userGet = (req, res) => {
  // If a specific user is required
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
    //Gets all users
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
 * Deletes one user
 *
 * @param {*} req Data required
 * @param {*} res Http status code 
 */
const userDelete = (req, res) => {
  // If a specific user is required
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(500);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      // If the user exists
      if (user) {
        user.remove(function (err) {
          if (err) {
            res.status(500).json({ message: "There was an error deleting the user" });
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
 * Updates a user
 *
 * @param {*} req Data required
 * @param {*} res Http status code 
 */
const userPatch = (req, res) => {
  // Gets a task by id
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }

      // Updates the task object (patch)
      user.firstName = req.body.name ? req.body.firstName : task.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : task.lastName;

      user.email = req.body.email ? req.body.email : task.email;
      user.password = req.body.password ? req.body.password : task.password;

      user.country = req.body.country ? req.body.country : task.country;
      user.city = req.body.city ? req.body.city : task.city;

      user.postalCode = req.body.postalCode ? req.body.postalCode : task.postalCode;
      user.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : task.phoneNumber;
      // Updates the task object (put)
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

/**
 * Exports
 */
module.exports = {
  userGet,
  userPost,
  userPatch,
  userDelete
}
