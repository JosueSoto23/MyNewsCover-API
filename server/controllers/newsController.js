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
        'location': `http://localhost:3000/api/news/?id=${news.id}`
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
    News.findById(req.query.id, function (err, news) {
      if (err) {
        res.status(404);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }
      res.json(news);
    });
  } else {
    // get all tasks
    News.find(function (err, news) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(news);
    });

  }
};

/**
 * Deletes on new
 *
 * @param {*} req
 * @param {*} res
 */
const newsDelete = (req, res) => {
  
  if (req.query && req.query.id) {
    News.findById(req.query.id, function (err, news) {
      if (err) {
        res.status(500);
        console.log('error while queryting the news', err)
        res.json({ error: "news doesnt exist" })
      }
      
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

module.exports = {
  newsGet,
  newsPost,
  newsDelete
}