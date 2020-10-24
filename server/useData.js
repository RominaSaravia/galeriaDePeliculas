const fs = require("fs");

/**
 * Funcion que recibe una lista de peliculas
 * 
 * @param {function} Cb CallBack para recibir resultados como parametro
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