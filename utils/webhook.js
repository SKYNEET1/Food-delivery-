
const axios = require('axios');
const { webhooks } = require('../helper/webhookAddress')

const dispatchWebhook = (eventType, data) => {
    webhooks.forEach(async (hook) => {
        try {
            if (hook.eventTypes.includes(eventType)) {
                await axios.post(hook.payloadURL, data, {
                    headers: {
                        "x-secret": hook.secret
                    }
                })
                console.log(`✅ Sent ${eventType} to ${hook.payloadURL}`);
            }
        } catch (error) {
            console.log(`❌ Failed sending ${eventType} to ${hook.payloadURL}: ${error.message}`);
        }
    })

}

module.exports = dispatchWebhook;