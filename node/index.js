const pool = require("./model/db");
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const path = require("path");
const admine = require('./routes/all-admines');
const enseignant = require("./routes/all-enseignants");
const classe = require("./routes/all-classes");
const Etudiant = require("./routes/all-etudiants");




app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const multer = require("multer");
app.use(express.json()); //Utilise un middleware pour analyser les requêtes.

app.use("/", express.static(path.join("images")));

app.use(express.json()); 













app.use(admine);
app.use(enseignant);
app.use(classe);
app.use(Etudiant);











const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post(
  `/uploadImage`,
  imageUpload.array("imgCollection"),
  function (req, res) {
   
    const { originalname } = req.files[0];
    return res.status(200).json("http://localhost:4000/" + originalname);
  }
);



app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});