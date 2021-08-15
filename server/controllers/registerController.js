/**
 * Model connector
 */
const User = require("../models/registerModel");
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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

function textEmail (){
  console.log("Funcionando");
}

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

  //var token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET);

  //const urlConfirm = `${process.env.APIGATEWAY_URL}/account/confirm/${token}`;

  var mailOptions = {
    from: '"Remitente', // sender address
    to: user.email, // list of receivers
    subject: "[My News Cover] Please confirm your email address", // Subject line
    text:  `Hey ${user.firstName} ${user.lastName}!
    
    Thanks for joining My News Cover. To finish registration, please click the 
    link below to verify your account.
    http://localhost:3000/api/sessions?id=${user.id}&enable=true`// plain text body

    //html: `<p>Click <a href="http://localhost:3000/api/sessions?id=${user.id}">here</a> to reset your password</p>    `

    //html: `Hey ${user.firstName} ${user.lastName}!
    
    //Thanks for joining My News Cover. To finish registration, please click the 
    //link below to verify your account.

   
    //http://localhost:3000/api/users'${user._id}` // html body
  
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

const sessionGet = (req, res) => {
  console.log("working")
  if (req.query && req.query.id) {
    User.findById(req.query.id, function (err, user) {
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
/*
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  /* ----------------- busca a un usuario por medio del email ----------------- */
  /*const user = await User.findOne({ email: email });

  if (!user) {
    return res.json({ message: "the email doesnt exist" });
  }
  /* -------- compara las claves del usuario encontrado con el recibido ------- */
  /*const passwordValidate = await user.comparePassword(password);

  if (!passwordValidate) {
    return res.send({ message: "Incorrect password" });
  }
  /* ---------------------------- se crea el token ---------------------------- */
  /*const token = jwt.sign({ id: user._id }, process.env.TOKENACCESS, {
    expiresIn: 60 * 60 * 24,
  });

  /* ------------------ se envia datos del usuario y el token ----------------- */

  /*user.password = "...";

  res.send({ auth: true, token, user });
});



/*function confirmAccount(token) {
  var email = null;
  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    email = payload.email;
  } catch(err) {
    throw new Error('invalid token');
  }

  return this.findOne({ email })
    .then(user => {
      if (!user) throw new Error('user not found');
      if (user.enable) throw new Error('user already verified');

      user.enable = true;
      return user.save();
    });
}*/

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
  sessionGet
}
