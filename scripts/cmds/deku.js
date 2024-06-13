const axios = require("axios");

module.exports = {
    config: {
        name: "deku",
        version: "1.0.0",
        author: "Deku",
        countDown: 0,
        role: 0,
        shortDescription: {
            en: "Talk to Deku AI",
        },
        longDescription: {
            en: "Talk to Deku AI by providing a prompt.",
        },
        category: "AI",
        guide: {
            en: "deku <ask> to interact with Deku AI.",
        },
    },
    onStart: async function ({ api, event, args }) {
        try {
            const apiUrl = "https://deku-rest-api.replit.app/deku?prompt=";
            const prompt = encodeURIComponent(args.join(" "));
            
            if (!prompt) return api.sendMessage("Missing prompt!", event.threadID, event.messageID);
            
            const response = await axios.get(apiUrl + prompt);
            const responseData = response.data.data;
            
            return api.sendMessage(responseData, event.threadID, event.messageID);
        } catch (error) {
            console.error(error);
            return api.sendMessage(error.message, event.threadID, event.messageID);
        }
    }
};
