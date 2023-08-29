const express = require("express");
const router = express.Router();
const controle = require("../controllers/controllers-classes");

router.get("/classe", controle.classe_index_get);
router.get("/classe2/:id", controle.classe_index_get2);

router.delete("/classe/:id", controle.classe_delete);
router.post("/classe", controle.classe_post);
router.put("/classe/:id", controle.classe_put);
module.exports = router;
