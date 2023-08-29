const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-enseignants");

router.get("/enseignant", controle.enseignant_index_get);
router.get('/enseignant/:id', controle.enseignant_index_get1);

router.delete('/enseignant/:id',controle.enseignant_delete)
router.post("/enseignant", controle.enseignant_post);
router.put("/enseignant/:id",controle.enseignant_put);
router.post("/enseignantLogin",controle.enseignant_Login);
module.exports = router;
