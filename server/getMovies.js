const mongo = require("./const").mongodb;
const fs = require("fs");
const path = require("path");

/**
 * Funcion que devuelve la lista de peliculas
 * Lee localmente un archivo JSON
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

/**
 * Consult all films in the DB
 * @param {function} cbResponse fn:(data: Array<films>) 
 */
const getAllMoviesdb = ( cbResponse ) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.config, (err , client) => {
    if(err) {
      console.log("No se pudo conetctar a Mongo")
      cbResponse([]);
      client.close();
    }else{
      const serverDB = client.db("filmsDB");
      const filmCollection = serverDB.collection("allFilms");

      filmCollection.find({}).toArray( (err, data )=>{
        if(err){
          console.log("No se pudo traer la data")
          cbResponse([]);
        }else{
          cbResponse(data)
        }

        client.close();

      })
    }
  })
}

module.exports = {
  getMovieList,
  getAllMoviesdb
}