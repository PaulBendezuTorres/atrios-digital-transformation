const express = require('express');
const router = express.Router();
const ticketsController = require('./tickets.controller');

router.get('/', ticketsController.getTickets);
router.post('/', ticketsController.createTicket);
router.put('/:id', ticketsController.updateTicket);

module.exports = router;
