const axios = require('axios');

module.exports = {
  config: {
    name: "ff",
    version: "1.0",
    author: "Vex_Kshitiz",
    countDown: 5,
    role: 0,
    longDescription: "lauda reels.",
    category: "FF Video",
    guide: "{p}ffreels",
  },

  onStart: async function ({ api, event, message }) {
    api.setMessageReaction("✨", event.messageID, () => {}, true);

    try {
      const { data } = await axios.get("https://smfahim.onrender.com/ff/apikey=puti");
      if (data.code !== 200) throw new Error("api issue");

      const fileId = data.url.match(/\/d\/(.+?)\//)[1];
      const directUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
      const { data: videoStream } = await axios.get(directUrl, { responseType: 'stream' });

      message.reply({ body: ``, attachment: videoStream });
    } catch (error) {
      console.error('Error', error);
      message.reply({ body: "error" });
    }
  },
};
