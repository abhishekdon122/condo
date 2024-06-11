const axios = require("axios");
const fs = require("fs");
const path = require("path");

const usernames = [
  "xo.astro_",
  "piyush____rana__",
  "aasish.9_",
  "mahimagr.op",
  "0.02black",
  "bsturn7",
  "al0n_magar15",
  "buddhagrg92",
  "labish_here",
  "suiree_bepyyyyy",
  "xo.astro_",
 
];


const paginationTokens = [
  // dont add pagination token if you are using multiple usernames.

];

module.exports = {
  config: {
    name: "status", 
    aliases: ["aabu"],
    author: "Vex_Kshitiza",
    version: "199.0",
    cooldowns: 5, 
    role: 0,
    shortDescription: "Get status video from Instagram user",
    longDescription: "Get status video from a specified Instagram user.",
    category: "utility",
    guide: "{p}s",
  },

  // dont change anything below if you dont know how it works
  onStart: async function ({ api, event, args, message }) {
    api.setMessageReaction("✨", event.messageID, (err) => {}, true);

    try {
      let username, token, apiUrl;

      if (paginationTokens.length > 0) {
        const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
        const randomTokenIndex = Math.floor(Math.random() * paginationTokens.length);
        username = usernames[randomUsernameIndex];
        token = paginationTokens[randomTokenIndex];
        apiUrl = `https://insta-scrapper-kappa.vercel.app/kshitiz?username=${username}&token=${token}`;
      } else {
        const randomUsernameIndex = Math.floor(Math.random() * usernames.length);
        username = usernames[randomUsernameIndex];
        apiUrl = `https://insta-scrapper-kappa.vercel.app/kshitiz?username=${username}`;
      }

      const apiResponse = await axios.get(apiUrl);

      const videoURL = apiResponse.data.videoURL;

      const videoResponse = await axios.get(videoURL, { responseType: "stream" });

      const tempVideoPath = path.join(__dirname, "cache", `insta_video.mp4`);

      const writer = fs.createWriteStream(tempVideoPath);
      videoResponse.data.pipe(writer);

      writer.on("finish", async () => {
        const stream = fs.createReadStream(tempVideoPath);

        message.reply({
          body: "",
          attachment: stream,
        });

        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      });
    } catch (error) {
      console.error(error);
      message.reply("Sorry, an error occurred.");
    }
  }
};