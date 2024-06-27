const axios = require("axios");

module.exports = {
  config: {
    name: "pickuplines",
    aliases: ["pickupline"],
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "Get pickup lines",
    longDescription: {
      en: "Get random pickup lines.",
    },
    category: "fun",
    guide: {
      en: "{prefix}pickuplines",
    },
  },

  onStart: async function ({ message, api, event }) {
    try {
      const isSend = event.body.toLowerCase().includes("send");
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const { pickupline } = response.data;
      let replyMessage = `🤍 ${pickupline}`;

      if (isSend) {
        replyMessage += " (sent)";
      }

      return message.reply(replyMessage);
    } catch (error) {
      console.error(error);
      return message.reply("❌ An error occurred while fetching the pickup line.");
    }
  },
};
