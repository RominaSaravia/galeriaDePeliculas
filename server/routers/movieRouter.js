const express = require("express");
const movie = require("../getMovies.js")

const movieRouter = express.Router();


//GET pagina de cada pelicula
movieRouter.get("/:sortby/:yearsortby/:id", (req, res) => {

  if (!req.params.id) {
    return
  }
  movie.getAllMoviesdb((list) => {
    const movieFound = list.find(item => item.id == req.params.id);

    res.render("movie-detail", {
      movieFound
    })
  })

})

// GET devuelve la pagina ordenada por ASC o DESC
movieRouter.get("/:sortby/:yearsortby/", (req, res) => {
  if (!req.params.yearsortby) {
    return
  }

  //ASC
  if (req.params.yearsortby == "ASC") {
    movie.getAllMoviesdb((list) => {

      orderedList = list.sort(function (a, b) {
        if (a.year > b.year) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0
      })

      res.render("movie-list", {
        movie: orderedList,
        yearsorted: "DESC"
      });
    });
  }


  if (req.params.yearsortby == "DESC") {
    movie.getAllMoviesdb((list) => {

      orderedList = list.sort(function (a, b) {
        if (a.year > b.year) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0
      })

      res.render("movie-list", {
        movie: orderedList,
        yearsorted: "ASC"
      });
    });


  }


})

// GET devuelve la pagina ordenada por ASC o DESC
movieRouter.get("/:sortby/", (req, res) => {
  if (!req.params.sortby) {
    return
  }

  if (req.params.sortby == "ASC") {
    movie.getAllMoviesdb((list) => {

      orderedList = list.sort(function (a, b) {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0
      })

      res.render("movie-list", {
        movie: orderedList,
        sorted: "DESC"
      });
    });
  }


  if (req.params.sortby == "DESC") {
    movie.getAllMoviesdb((list) => {

      orderedList = list.sort(function (a, b) {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0
      })

      res.render("movie-list", {
        movie: orderedList,
        sorted: "ASC"
      });
    });


  }


})

//GET a /movie/
movieRouter.get("/", (req, res) => {

  movie.getAllMoviesdb(list => {
    res.render("movie-list", {
      movie: list
    });
  });
})

module.exports = movieRouter;