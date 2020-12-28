const fs = require("fs");
const path = require("path");

/**
 * Funcion que devuelve la lista de peliculas
 * 
 * @param {function} Cb Callback fn 
 */
const getMovieList = (Cb) =>{
  fs.readFile(path.join(__dirname, "movie-list.json" ),"utf8", (err,data) => {
    if(err) {
      console.log("No se pudo leer");
      Cb([]);
    }else {
      Cb(JSON.parse(data));
    }

  })

}

module.exports = {
  getMovieList
}