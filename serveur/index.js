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
    time: "2025-03-16T18:46:58.034Z",
    msg: "Hello, World!",
  },
]; // tableau pour stocker les messages

// Middleware pour envoyer les fichiers statiques sur la route /
app.use(express.static(`${process.env.APP_DIR}/client`));

// Middleware pour automatiquement parser le JSON dans les requêtes POST
app.use(express.json());

// On check le paramètre id plutôt qu'une route /msg/:id
app.get("/msg/get", function (req, res) {
  if (!req.query?.id) {
    res.status(400).json({ err: "Unspecified message number" }); // 400 = Bad Request, requête mal formée
    return;
  }

  const messageId = parseInt(req.query.id);
  if (isNaN(messageId) || messageId < 0) {
    res.status(400).json({ err: "Invalid message number" }); // 400 = Bad Request, requête mal formée
    return;
  }

  if (messageId >= allMsgs.length) {
    res.status(404).json({ err: "Message does not exist" }); // 404 = Not Found, ressource n'existe pas
    return;
  }
  res.status(200).json(allMsgs[messageId]);
});

app.get("/msg/nber", function (req, res) {
  res.status(200).json(allMsgs.length);
});

app.get("/msg/getAll", function (req, res) {
  res.status(200).json(allMsgs);
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
  // On pourrait faire un filtrage anti-XSS ici mais peut-être il vaut mieux le faire côté client ?
  allMsgs.push({ author: newMsg.author, msg: newMsg.msg, time: newMsg.time });
  res.status(201).end(); // 201 = Created
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");
