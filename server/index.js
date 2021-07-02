const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {
  userPatch,
  userPost,
  userGet,
  userDelete
} = require("./controllers/registerController");

const {
  categoryPatch,
  categoryPost,
  categoryGet,
  categoryDelete
} = require("./controllers/categoryController");

/*const {
  newsPatch,
  newsPost,
  newsGet,
  newsDelete
} = require("./controllers/newsController");
*/
const {
  newsSourcePatch,
  newsSourcePost,
  newsSourceGet,
  newsSourceDelete
} = require("./controllers/newssourcesController");


// check for cors
const cors = require("cors");
app.use(cors({
  domains: '*',
  methods: "*"
}));

// listen to the task request
/*app.get("/api/tasks", taskGet);
app.post("/api/tasks", taskPost);
app.patch("/api/tasks", taskPatch);
app.put("/api/tasks", taskPatch);
app.delete("/api/tasks", taskDelete);*/
/**http://localhost:3000/api/users */
app.get("/api/users", userGet);
app.post("/api/users", userPost);
app.patch("/api/users", userPatch);
app.put("/api/users", userPatch);
app.delete("/api/users", userDelete);

app.get("/api/categories", categoryGet);
app.post("/api/categories", categoryPost);
app.patch("/api/categories", categoryPatch);
app.put("/api/categories", categoryPatch);
app.delete("/api/categories", categoryDelete);

/*app.get("/api/news", newsGet);
app.post("/api/news", newsPost);
app.patch("/api/news", newsPatch);
app.put("/api/news", newsPatch);
app.delete("/api/news", newsDelete);
*/
app.get("/api/newsSources", newsSourceGet);
app.post("/api/newsSources", newsSourcePost);
app.patch("/api/newsSources", newsSourcePatch);
app.put("/api/newsSources", newsSourcePatch);
app.delete("/api/newsSources", newsSourceDelete);

app.listen(3000, () => console.log(`Project app listening on port 3000!`))