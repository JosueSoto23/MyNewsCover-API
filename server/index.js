const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

/*const {
  taskPatch,
  taskPost,
  taskGet,
  taskDelete
} = require("./controllers/taskController");*/

const {
  userPatch,
  userPost,
  userGet,
  userDelete
} = require("./controllers/registerController");

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

app.listen(3000, () => console.log(`Example app listening on port 3000!`))