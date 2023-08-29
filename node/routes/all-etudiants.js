const express = require("express");
const router = express.Router();
const controle = require("../controllers/contollers-etudiants");

router.get("/etudiant", controle.etudiant_index_get);
router.delete("/etudiant/:id", controle.etudiant_delete);
router.post("/etudiant", controle.etudiant_post);
// router.post("/etudiantprof", controle.etudiant_post);
router.put("/etudiantadmine/:id", controle.etudiant_putadmine);
router.put("/etudiantprof/:id", controle.etudiant_putprof);

module.exports = router;
