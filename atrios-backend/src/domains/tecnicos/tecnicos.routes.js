const express = require('express');
const router = Router = express.Router();
const tecnicosController = require('./tecnicos.controller');

router.get('/', tecnicosController.getTecnicos);

module.exports = router;
