const axios = require('axios');
const fs = require('fs');
 
module.exports = {
  config: {
    name: "ff",
    aliases: ["freefire","ffvideo"],
    version: "1.0",
    author: "Fahim the Noob",
    role: 0,
    shortDescription: {
      en: "Send a ff video"
    },
    longDescription: {
      en: "Fetches an freefire video from the provided API, downloads it, and sends it to the chat"
    },
    category: "video",
    guide: {
      en: "Type 'ff' to get an freefire short video."
    }
  },
  onStart: async function ({ api, message, event }) {
    try {
      const response = await axios.get('https://fahim-ff.onrender.com/video/apikey=Noob');
      const videoUrl = response.data.url;
      message.reaction("🕑", event.messageID); 
      const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
      const videoStream = fs.createWriteStream('video.mp4');
      videoResponse.data.pipe(videoStream);
      
      await new Promise((resolve, reject) => {
        videoStream.on('finish', resolve);
        videoStream.on('error', reject);
      });
        message.reaction("✅", event.messageID);
      await message.reply({
        body: 'Here is your ff video:',
        attachment: fs.createReadStream('video.mp4')
      }, event.threadID);
    
      fs.unlinkSync('video.mp4');
      
      
    } catch (error) {
      console.error(error);
      await api.sendMessage(`Sorry, there was an error fetching the video.`, event.threadID);
      await message.reaction("❌", event.messageID);
    }
  }
};
