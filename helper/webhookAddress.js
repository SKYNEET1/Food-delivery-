
module.exports = {
  webhooks: [
    {
      payloadURL: "http://localhost:3000/webhook",
      secret: "my-secret",
      eventTypes: ["foodStatus", "paymentStatus"]
    }
  ]
};
