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

let cpt = 0;

app.get("/cpt/query", function (req, res) {
  res.json(cpt);
});

app.post("/cpt/inc", function (req, res) {
  // Un POST semble plus approprié qu'un GET (pas idempotent), un PATCH serait peut-être encore mieux

  // Si la requête ne contient pas de paramètre, on incrémente de 1.
  if (!req.query.v) {
    cpt++;
    res.json(cpt);
    return;
  }

  // Sinon, on incrémente de la valeur passée en paramètre.
  const val = parseInt(req.query.v);

  // Si on ne peut pas décoder la valeur, le résultat sera NaN
  if (isNaN(val)) {
    res.json({ code: -1 }); // Un 400 Bad Request serait plus approprié
    return;
  }

  cpt += val;
  res.json({ code: 0 }); // Je mettrais plutôt un 200 OK pour faire une vraie API REST mais bon
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
