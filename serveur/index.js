var express = require("express"); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Ici faut faire faire quelque chose à notre app...
// On va mettre les "routes"  == les requêtes HTTP acceptéés par notre application.

var allMsgs = ["Hello World", "foobar", "CentraleSupélec Forever !"]; // tableau pour stocker les messages

app.get("/msg/get/*", function (req, res) {
  const messageId = parseInt(req.url.substring(9));
  if (isNaN(messageId) || messageId < 0 || messageId >= allMsgs.length) {
    res.json({ code: 0 });
    return;
  }
  res.json({ code: 1, message: allMsgs[messageId] });
});

app.get("/msg/nber", function (req, res) {
  res.json(allMsgs.length); // Peut-être qu'on devrait renvoyer un objet JSON avec le code plutôt qu'un nombre, pour garder un format uniforme
});

app.get("/msg/getAll", function (req, res) {
  res.json(allMsgs);
});

app.post("/msg/add/*", function (req, res) {
  const message = decodeURIComponent(req.url.substring(9));
  allMsgs.push(message);
  res.json(allMsgs.length - 1);
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
