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

var allMsgs = [
  {
    author: "Anonymous",
    time: "07-03-2025T16:44:00",
    msg: "Hello, World!",
  },
]; // tableau pour stocker les messages

// Middleware pour envoyer les fichiers statiques sur la route /
app.use(express.static(`${process.env.APP_DIR}/client`));

// Middleware pour automatiquement parser le JSON dans les requêtes POST
app.use(express.json());

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

app.post("/msg/add", function (req, res) {
  let newMsg = req.body;
  if (!newMsg) {
    res.status(200).json({ err: "Invalid JSON Body" });
  }

  if (
    !newMsg?.author ||
    !newMsg?.msg ||
    newMsg.author === "" ||
    newMsg.msg === "" ||
    !newMsg?.time ||
    newMsg.time === ""
  ) {
    res.status(400).json({ err: "author, msg and time fields are required." });
    return;
  }

  // On filtre les champs inutiles éventuellement présents dans le corps de la requête.
  allMsgs.push({ author: newMsg.author, msg: newMsg.msg, time: newMsg.time });
  res.status(201); // 201 = Created
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
