const express = require('express');
const webHookRouter = express.Router();
const webHookUrl = require('../helper/webhookAddress');
const dispatchWebhook = require('../utils/webhook');

webHookRouter.post('/webhook',dispatchWebhook)

module.exports = webHookRouter