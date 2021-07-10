const User = require("../models/registerModel");

/**
 * Crea los usuarios
 *
 * @param {*} req
 * @param {*} res
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
      user.firstName = req.body.name ? req.body.firstName : task.firstName;
      user.lastName = req.body.lastName ? req.body.lastName : task.lastName;
    
      user.email = req.body.email ? req.body.email : task.email;
      user.password = req.body.password ? req.body.password : task.password;
    
      user.country = req.body.country ? req.body.country : task.country;
      user.city = req.body.city ? req.body.city : task.city;
    
      user.postalCode = req.body.postalCode ? req.body.postalCode : task.postalCode;
      user.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : task.phoneNumber;
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