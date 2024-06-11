const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "lines", 
    aliases: ["ls"], 

    
    author: "Vex_Kshitiz",

    
    version: "1.0",
    cooldowns: 10,
    role: 0,
    shortDescription: "",
    longDescription: "Get tiktok videos.",
    category: "fun",
    guide: "{p}tuktuk",
  },

  onStart: async function ({ api, event, message }) {
    function getRandomUsername() {

      const usernames = ['msserugo','chuppa_deu','amar_chhetri4','shubu__yt','zerox.is.back','anurag_karki8','asmit_chhetri10','lm10ujjwal','karan_chhetri26','lowkey77770','sunil_______gurung','kulung_trek'];
      
      // you can add multiple usernames too if you want to get random videos from random users.

      const randomIndex = Math.floor(Math.random() * usernames.length);
      return usernames[randomIndex];
    }

    api.setMessageReaction("✨", event.messageID, (err) => {}, true);

    try {
      const username = getRandomUsername();
      const response = await axios.get(`https://tuktuk-scrap.onrender.com/kshitiz?username=${username}`);
      const user = response.data.user || "@user_unknown";
      const postData = response.data.posts;
      const selectedUrl = getRandomUrl(postData);

      const videoResponse = await axios.get(selectedUrl, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `tuktuk.mp4`);
      const writer = fs.createWriteStream(tempVideoPath);
      videoResponse.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);
        await message.reply({
          body: ``,
          attachment: stream,
        });
        api.setMessageReaction("🤍", event.messageID, (err) => {}, true);
        fs.unlink(tempVideoPath, (err) => {
          if (err) console.error(err);
          console.log(`Deleted`);
        });
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred.");
    }
  }
};

let usedUrls = [];

function getRandomUrl(postData) {
  if (usedUrls.length === postData.length) {
    usedUrls = [];
  }

  let randomIndex;
  let selectedPost;
  do {
    randomIndex = Math.floor(Math.random() * postData.length);
    selectedPost = postData[randomIndex].replace(/\\/g, "/");
  } while (usedUrls.includes(selectedPost));

  usedUrls.push(selectedPost);
  return selectedPost;
}