/**
 * Model connector
 */
const User = require("../models/registerModel");
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const THE_SECRET_KEY = '123';

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
  user.enable = req.body.enable

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
      sendMail(user);
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

const sendMail = async(user) => {

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "geberthalfaro85@gmail.com", // generated ethereal user
      pass: "fpfbgqtqdxbtggod", // generated ethereal password
    },
  })

  var mailOptions = {
    from: '"Remitente', // sender address
    to: user.email, // list of receivers
    subject: "[My News Cover] Please confirm your email address", // Subject line
    text:  `Hey ${user.firstName} ${user.lastName}!
    
    Thanks for joining My News Cover. To finish registration, please click the 
    link below to verify your account.
    http://localhost:3000/api/sessions?id=${user.id}&enable=true`
  
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.status(500).send(error.message);
    } else {
      console.log("Email Sent");
      res.status(200).jsonp(req.body);
    }
  });
}

/*const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));
*/
const sessionGet = (req, res) => {
  console.log("working")
  if (req.query && req.query.id) {
    User.find(req.query.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }

      // Updates the task object (patch)
    
      user.enable = true;
      //user.email = "dasd@gmail.com"
      //user.role = "admin";
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
} 

const userAuth = async (req, res) =>{
  const { email, password } = req.body;

  const user = await User.find({ "email": email, "password": password });

  if (!user) {
    return res.json({ message: "the email doesnt exist" });
  }
  console.log(user)
  //const passwordValidate = await User.findOne({ password: password });
  jwt.sign({user}, THE_SECRET_KEY, {expiresIn: 1440}, (err, token) => {
    res.json({
        token
      });
    });
}

const sendMailLogin = (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "geberthalfaro85@gmail.com", // generated ethereal user
      pass: "fpfbgqtqdxbtggod", // generated ethereal password
    },
  })

  var mailOptions = {
    from: '"Remitente', // sender address
    to: req.body.email, // list of receivers
    subject: "[My News Cover] Please confirm your email address", // Subject line
    text:  `
    This link is for you to log in without having to enter your password.

    https://localhost/apps/MyNewsCover-App/client/fastLogin.html?email=${req.body.email}`
  
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.status(500).send(error.message);
    } else {
      console.log("Email Sent");
      res.status(200).jsonp(req.body);
    }
  });
}

const userGetbyEmail = (req, res) => {
  // If a specific user is required
  if (req.query && req.query.email) {
    User.find({ "email": req.query.email}, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      res.json(user);
    });
  } else {
    //Gets all users
    User.findById(req.query.id, function (err, user) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(user);
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
  if (req.query && req.query.email && req.query.password) {
    User.find({ "email": req.query.email, "password": req.query.password }, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      res.json(user);
    });
  } else {
    //Gets all users
    User.findById(req.query.id, function (err, user) {
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
    
      user.enable = req.body.enable ? req.body.enable : user.enable;
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
  userDelete,
  sessionGet,
  userAuth,
  sendMailLogin,
  userGetbyEmail
}
