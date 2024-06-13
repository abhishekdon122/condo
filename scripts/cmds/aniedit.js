const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "aniedit",
    aliases: ["animeedit","anivid"],
    version: "1.0",
    author: "Fahim the Noob",
    role: 0,
    shortDescription: {
      en: "Send a anime video"
    },
    longDescription: {
      en: "Fetches an anime video from the provided API, downloads it, and sends it to the chat"
    },
    category: "video",
    guide: {
      en: "Type 'aniedit' to get an anime video."
    }
  },
  onStart: async function ({ api, message, event }) {
    try {
      const response = await axios.get('https://fahim-anime-video.onrender.com/video/apikey=Puti');
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
        body: 'Here is your anime video:',
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
