/**
 * Express
 */
const express = require('express');
const app = express();

/**
 * Database connection
 */
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/Ultimate-project");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//const nodemailer = require('nodemailer');

/*app.post("/send/email", (req, res) => {
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
    to: "shadowshadow586@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?" // plain text body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if(error){
      res.status(500).send(error.message);
    } else {
      console.log("Email Enviado");
      res.status(200).jsonp(req.body);
    }
  });
});*/
/*
app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password &&
      req.body.username === 'admin' && req.body.password === 'password') {
      const session = saveSession(req.body.username);
      session.then(function (session
      ) {
          if (!session) {
              res.status(422);
              res.json({
                  error: 'There was an error saving the session'
              });
          }
          res.status(201).json({
              session
          });
      })
  } else {
      res.status(422);
      res.json({
          error: 'Invalid username or password'
      });
  }
});

app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
      const token = req.headers['authorization'].split(' ')[1];
      try {
          const session = getSession(token);
          session.then(function (session) {
              if (session) {
                  next();
                  return;
              } else {
                  res.status(401);
                  res.send({
                      error: "Unauthorized"
                  });
              }
          })
              .catch(function (err) {
                  console.log('there was an error getting the session', err);
                  res.status(422);
                  res.send({
                      error: "There was an error: " + err.message
                  });
              })
      } catch (e) {
          res.status(422);
          res.send({
              error: "There was an error: " + e.message
          });
      }
  } else {
      res.status(401);
      res.send({
          error: "Unauthorized"
      });
  }
});*/

/**
 * User controller
 */
const {
  userPatch,
  userPost,
  userGet,
  userDelete,
  sessionGet
} = require("./controllers/registerController");

/**
 * Category controller
 */
const {
  categoryPatch,
  categoryPost,
  categoryGet,
  categoryDelete
} = require("./controllers/categoryController");

/**
 * News controller
 */
const {
  getNewssources,
  newsPost,
  newsGet,
  newsDelete
} = require("./controllers/newsController");

/**
 * News Sources controller
 */
const {
  newsSourcePatch,
  newsSourcePost,
  newsSourceGet,
  newsSourceDelete
} = require("./controllers/newssourcesController");

const {
  confirmPatch
} = require("./controllers/confirmAcountController");

/**
 * Cors
 */
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

/**
 * Users http methods
 */
app.get("/api/users", userGet);
app.post("/api/users", userPost);
app.patch("/api/users", userPatch);
app.put("/api/users", userPatch);
app.delete("/api/users", userDelete);

app.get("/api/sessions", sessionGet);

app.patch("/api/confirmAcount", confirmPatch);
app.put("/api/confirmAcount", confirmPatch);

/**
 * Categories http methods
 */
app.get("/api/categories", categoryGet);
app.post("/api/categories", categoryPost);
app.patch("/api/categories", categoryPatch);
app.put("/api/categories", categoryPatch);
app.delete("/api/categories", categoryDelete);

/**
 * News http methods
 */
app.get('/newss', getNewssources);
app.get("/api/news", newsGet);
app.post("/api/news", newsPost);
app.delete("/api/news", newsDelete);

/**
 * News Sources http methods
 */
app.get("/api/newsSources", newsSourceGet);
app.post("/api/newsSources", newsSourcePost);
app.patch("/api/newsSources", newsSourcePatch);
app.put("/api/newsSources", newsSourcePatch);
app.delete("/api/newsSources", newsSourceDelete);

/**
 * Host
 */
app.listen(3000, () => console.log(`Project app listening on port 3000!`))