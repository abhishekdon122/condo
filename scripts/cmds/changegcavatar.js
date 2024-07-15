const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "changegcavatar",
    version: "1.0",
    aliases: ["cga"],
    author: "hedroxyy",
    shortDescription: "Change the avatar of the group chat.",
    longDescription: "Changes the avatar of the group chat using a replied photo.",
    category: "admin",
    guide: {
      en: "{pn} (reply to photo)"
    },
    role: 2
  },

  onStart: async function ({ api, event }) {
    const imgbbApiKey = "1b4d99fa0c3195efe42ceb62670f2a25";

    const linkanh = event.messageReply?.attachments[0]?.url;
    if (!linkanh) {
      return api.sendMessage('Please reply to an image.', event.threadID, event.messageID);
    }

    try {
      const response = await axios.get(linkanh, { responseType: 'arraybuffer' });

      const formData = new FormData();
      formData.append('image', Buffer.from(response.data, 'binary'), { filename: 'image.png' });
      const res = await axios.post('https://api.imgbb.com/1/upload', formData, {
        headers: formData.getHeaders(),
        params: {
          key: imgbbApiKey
        }
      });
      const imageLink = res.data.data.url;

      const imgResponse = await axios.get(imageLink, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(imgResponse.data, 'binary');
      const imagePath = __dirname + '/tmp/avatar.jpg';

      fs.writeFileSync(imagePath, imageBuffer);

      api.changeGroupImage(fs.createReadStream(imagePath), event.threadID, (err) => {
        if (err) {
          console.error("❌ | Failed to Change");
          return api.sendMessage("❌ | Failed to Change", event.threadID, event.messageID);
        }
        api.sendMessage("✅ | Successfully Changed", event.threadID, event.messageID);
      });

    } catch (error) {
      console.error("❌ | Error Occurred");
      api.sendMessage("❌ | Failed To Change", event.threadID, event.messageID);
    }
  }
};
