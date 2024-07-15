const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

async function generateDirectLink(api, event) {
  if (event.type !== "message_reply" || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
    return api.sendMessage({ body: "❌ | Please reply to an attachment." }, event.threadID, event.messageID);
  }

  const attachment = event.messageReply.attachments[0];

  try {
    // Use the attachment URL directly for enhancing the photo
    return attachment.url;
  } catch (error) {
    api.sendMessage({ body: "❌ | Error Occured" }, event.threadID, event.messageID);
    console.error(error);
    return null;
  }
}

module.exports = {
  config: {
    name: "photoenhancer",
    aliases: ["peh"],
    version: "1.0",
    author: "hedroxyy",
    role: 0,
    category: "image",
    description: "Enhances the photo you reply to.",
    guide: {
      vi: "{p} để cải thiện ảnh bạn trả lời.",
      en: "{p} to enhance the photo you reply to."
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const photoUrl = await generateDirectLink(api, event);
      if (!photoUrl) {
        return;
      }

      const apiUrl = `https://joshweb.click/remini?q=${encodeURIComponent(photoUrl)}`;
      const { data } = await axios.get(apiUrl);

      if (data.result) {
        const enhancedPhoto = await axios.get(data.result, { responseType: "arraybuffer" });
        const photoPath = __dirname + "/tmp/enhanced_photo.jpg";
        fs.writeFileSync(photoPath, Buffer.from(enhancedPhoto.data, "utf-8"));

        return api.sendMessage({
          body: "Here is your enhanced photo",
          attachment: fs.createReadStream(photoPath)
        }, event.threadID, event.messageID);
      } else {
        return api.sendMessage("Failed to enhance the photo.", event.threadID, event.messageID);
      }
    } catch (error) {
      console.error(error);
      return api.sendMessage("An error occurred while enhancing the photo.", event.threadID, event.messageID);
    }
  }
};
