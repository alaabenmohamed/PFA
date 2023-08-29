const express = require('express');
const router = express.Router();
const controle =require('../controllers/controllers-admines')


router.get('/admine', controle.admine_index_get)
// router.delete('/admine/:id',controle.admine_delete) 
router.post('/admine',controle.admine_post);
// router.put("/admineput/:id",controle.admine_put);
// router.post("/admineLogin",controle.admine_Login);
module.exports = router;