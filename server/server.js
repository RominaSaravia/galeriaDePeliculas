const PORT = 3000;
const express = require("express");
const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars")

const movieRouter = require("./routers/movieRouter");

const app = express();

//Middleware - recursos estaticos
app.use(express.static(path.join(__dirname, "/public")));

app.engine("handlebars", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(__dirname, "/views/layout")

}));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));


app.get("/", (req, res) => {
  res.render("home");
});

//Router
app.use("/movie", movieRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server iniciado: http://localhost:${PORT}`)

});