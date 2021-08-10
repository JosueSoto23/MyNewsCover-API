/**
 * Express
 */
const express = require('express');
const app = express();

/**
 * Database connection
 */
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api");

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

/**
 * User controller
 */
const {
  userPatch,
  userPost,
  userGet,
  userDelete
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