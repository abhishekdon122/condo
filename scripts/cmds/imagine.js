const axios = require('axios');
const path = require('path');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "imagine",
    aliases: [],
    version: "1.0",
    author: "Sarkardocs",
    countDown: 5,
    role: 0,
    longDescription: {
      vi: '',
      en: "Imagine"
    },
    category: "ai",
    guide: {
      vi: '',
      en: "{pn} <prompt> - <resolution>"
    }
  },

  onStart: async function ({ api, commandName, event, args }) {
    try {
      
      let prompt = args.join(' ');
      let resolution = '1024x768';

      if (args.length > 0 && args.includes('-')) {
        const parts = args.join(' ').split('-').map(part => part.trim());
        if (parts.length === 2) {
          prompt = parts[0];
          resolution = parts[1];
        }
      }

      const response = await axios.get(`https://for-devs.onrender.com/api/playgroundai?prompt=${encodeURIComponent(prompt)}&resolution=${encodeURIComponent(resolution)}&apikey=rishadboss`);
      const imageUrl = response.data.imageUrl

      const imgResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const imgPath = path.join(__dirname, 'cache', 'image.jpg');
      await fs.outputFile(imgPath, imgResponse.data);

api.setMessageReaction("✅", event.messageID, () => {}, true);

      await api.sendMessage({ body: '', attachment: fs.createReadStream(imgPath) }, event.threadID, event.messageID);
    } catch (error) {
      console.error("Error:", error);
      api.sendMessage("error contact Sarkardocs", event.threadID, event.messageID);
    }
  }
};
