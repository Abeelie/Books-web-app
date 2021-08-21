const express = require("express");
const axios = require("axios");

const router = new express.Router();

const googleKey = process.env.googleKey;
const nyTimesKey = process.env.nyTimesKey;
const nyTimesNewsKeys = process.env.nyTimesNewsKeys;

const emailKey1 = process.env.emailKey1;
const emailKeyService = process.env.emailKeyService;
const emailTemp = process.env.emailTemp;


router.get("/", async function (req, res, next) {
  try {
    const fictionPaperBack = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/Trade-Fiction-Paperback.json?api-key=${nyTimesKey}`);
    const paperBackNonFiction = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/Paperback-Nonfiction.json?api-key=${nyTimesKey}`);
    const hardcoverFiction = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nyTimesKey}`);
    const youngAdultHardcover = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/Young-Adult-Hardcover.json?api-key=${nyTimesKey}`);

    return res.render("home.html", 
    {fictionPaperBack:fictionPaperBack.data.results.books, 
    paperBackNonFiction:paperBackNonFiction.data.results.books,
    hardcoverFiction:hardcoverFiction.data.results.books,
    youngAdultHardcover:youngAdultHardcover.data.results.books
  });
  } catch (err) {
    return next(err);
  }
});


router.get("/search", async function (req, res, next) {
try{
    return res.render("search-books.html", {googleKey});
  } catch (err) {
    return next(err);
  }
});



router.get("/recommendations", async function (req, res, next) {
try{
    const recommendations = await axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${nyTimesKey}`);
    return res.render("recommendation.html", 
    {recommendations:recommendations.data.results.books});
  } catch (err) {
    return next(err);
  }
});


router.get("/news", async function (req, res, next) {
try{
    const bookNews = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=books&api-key=${nyTimesNewsKeys}`);
    return res.render("book-news.html",
    {bookNews:bookNews.data.response.docs});
  } catch (err) {
    return next(err);
  }
});


router.get("/search-history", async function (req, res, next) {
  try{
      return res.render("search-history.html", 
      {emailKey1, emailKeyService, emailTemp})
    } catch (err) {
      return next(err);
    }
  });




module.exports = router;