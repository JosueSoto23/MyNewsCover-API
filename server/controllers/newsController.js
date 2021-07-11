const News = require("../models/newsModel");

/**
 * Creates news
 *
 * @param {*} req
 * @param {*} res
 */
const newsPost = (req, res) => {
  var news = new News();

  news.title = req.body.title;
  news.short_description = req.body.short_description;

  news.permanlink = req.body.permanlink;

  news.date = req.body.date;
  news.news_source_id = req.body.news_source_id;

  news.user_id = req.body.user_id;
  news.category_id = req.body.category_id; 

  if (news.title && news.short_description && news.permanlink && news.news_source_id) {
    news.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the news', err)
        res.json({
          error: 'There was an error saving the news'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/newss/?id=${news.id}`
      });
      res.json(news);
    });
  } else {
    res.status(422);
    console.log('error while saving the news')
    res.json({
      error: 'No valid data provided for news'
    });
  }
};

/**
 * Get all news
 *
 * @param {*} req
 * @param {*} res
 */
const newsGet = (req, res) => {
  
  if (req.query && req.query.id) {
    news.findById(req.query.id, function (err, news) {
      if (err) {
        res.status(404);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }
      res.json(news);
    });
  } else {
    // get all tasks
    news.find(function (err, news) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(news);
    });

  }
};

/**
 * Delete one task
 *
 * @param {*} req
 * @param {*} res
 */
const newsDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    news.findById(req.query.id, function (err, news) {
      if (err) {
        res.status(500);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }
      //if the task exists
      if(news) {
        news.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the news"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a news ID" });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const newsPatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    news.findById(req.query.id, function (err, news) {
      if (err) {
        res.status(404);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }

      // update the task object (patch)
      news.title = req.body.name ? req.body.title : task.title;
      news.short_description = req.body.short_description ? req.body.short_description : task.short_description;
    
      news.permanlink = req.body.permanlink ? req.body.permanlink : task.permanlink;
      news.password = req.body.password ? req.body.password : task.password;
    
      news.date = req.body.date ? req.body.date : task.date;
      news.news_source_id = req.body.news_source_id ? req.body.news_source_id : task.news_source_id;
    
      news.user_id = req.body.user_id ? req.body.user_id : task.user_id;
      news.category_id = req.body.category_id ? req.body.category_id : task.category_id;
    
      news.postalCode = req.body.postalCode ? req.body.postalCode : task.postalCode;
      news.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : task.phoneNumber;
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      news.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the news', err)
          res.json({
            error: 'There was an error saving the news'
          });
        }
        res.status(200); // OK
        res.json(news);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "news doesnt exist" })
  }
};

module.exports = {
  newsGet,
  newsPost,
  newsPatch,
  newsDelete
}