const express = require('express');
const router = express.Router();
const chatController = require('./chat.controller');
const whatsappWebhookController = require('./whatsapp.webhook.controller');

router.post('/', chatController.processChat);
router.post('/webhook-whatsapp', whatsappWebhookController.handleWhatsAppWebhook);

module.exports = router;
