const PORT = 3000;
const express = require("express");
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars")

const app = express();

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "/views/layout")

}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));



//Middleware - recursos estaticos
app.use(express.static(path.join(__dirname, "/public")));


app.get("/", (req, res) => {
  res.render("home", { name: "Romina" });
});

//Endpoint GET a /movie-list
app.get("/movie", (req, res) => {

  getMovieList((list) => {

    res.render("movie-list", {
      movie: list
    });
  });
})

app.get("/movie/:sortby/", (req, res) => {

  if (!req.params.sortby) {
    return
  }

  getMovieList((list) => {

    orderedList = list.sort(function(a,b) {
      if( a.title > b.title ) {
        return 1;
      }
      if(a.title < b.title) {
        return -1;
      }
      return 0
    })

    res.render("movie-list", {
      movie: orderedList
    });
  });
})



app.get("/movie/:sortby/:id", (req, res) => {

  if (!req.params.id) {
    return
  }
  getMovieList((list) => {
    const movieFound = list.find(item => item.id == req.params.id);

    res.render("movie-detail", {
      movieFound
    })
  })

})



/**
 * Funcion que recibe una lista de peliculas
 * 
 * @param {function} Cb CallBack para recibir resultados como parametro
 */
const getMovieList = (Cb) => {
  fs.readFile(path.join(__dirname, "movie-list.json"), "utf8", (err, data) => {
    if (err) {
      console.log("No se pudo leer");
      Cb([]);
    } else {
      Cb(JSON.parse(data));
    }

  })

}



app.listen(process.env.PORT || PORT, () => {
  console.log(`Server iniciado: http://localhost:${PORT}`)

});