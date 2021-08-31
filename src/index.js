const express = require("express");
const path = require("path");
const hbs = require("hbs");
const requests = require("requests");
const app = express();

const port  = 8000;
const host = "127.0.0.1";

//* static page using express static middleware
// const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));

//* set the view engine
app.set("view engine", "hbs");

//* changing views directory name to template
const templatePath = path.join(__dirname, "../template/views");
app.set("views", templatePath);

//* registering partial path
const partialPath = path.join(__dirname, "../template/partials");
hbs.registerPartials(partialPath);

//* route the hbs template
app.get("/", (req, res) => {
    res.render("index", {
        templateName: "HBS",
    });
});

app.get("/temp", (req, res) => {
    const cityname = (req.query.name !== undefined) ? req.query.name : "Delhi";
    res.render("temp", {
        cityName: cityname
    });

    requests(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=ffa04a17625d0d4a1c2392242039a72a`).on('data',  (chunk) => {
            
            const objData = JSON.parse(chunk);
            const arrData = [objData];

            console.log(`City name: ${cityname} Temp: ${arrData[0].main.temp} MaxTemp: ${arrData[0].main.temp_max} MinTemp: ${arrData[0].main.temp_min}`);
               
            });
            res.end();

        }).on('end',  (err) => {
        if (err) return console.log('connection closed due to errors ', err);
            res.end();
        });


// app.get("/", (req, res) => {
//     res.end("<h1>Hello</h1>");
// });

app.get("*", (req, res) => {
   res.render("404"); 
});

app.listen(port, host, () => {
    console.log(`Port listening on ${port}`);
})