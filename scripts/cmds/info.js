const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const NepaliDate = require('nepali-date');

module.exports = {
  config: {
    name: "info",
    version: "1.3",
    author: "AceGun", // modified by haker
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and admin."
    },
    category: "utility",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message }) {
    const botName = "Siksheyy 😈";
    const botPrefix = ".";
    const authorName = "Abhishek Dahal";
    const authorFB = "FB.Me/100029100196795";
    const authorInsta = "abhishekeyy.69";
    const status = "Pure Single";

    const now = moment().tz('Asia/Kathmandu');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    const nepaliDate = new NepaliDate(now.toDate());
    const bsDateStr = nepaliDate.format("dddd, DD MMMM");

    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${hours}hrs ${minutes}min ${seconds}sec`; 

  
    const ownerUid = '100029100196795';
    const ownerName = 'Abhishek Dahal';

    const imagePath = path.join(__dirname, "cache", "rendi.jpg"); 

    
    await downloadImage("https://i.ibb.co/Y8PJSBH/image.jpg", imagePath);

    const stream = fs.createReadStream(imagePath);

    message.reply({
      body: `===「 Bot & owner Info 」===
❀ Bot Name: ${botName}
❀ Bot Prefix: ${botPrefix}
❀ Author Name: ${authorName}
❀ FB: ${authorFB}
❀ Insta: ${authorInsta}
❀ Status: ${status}
❀ Date: ${date}
❀ BsDate: ${bsDateStr}
❀ Time: ${time}
❀ Bot Running: ${uptimeString}
=====================`,
      attachment: stream, 
    }, (err) => {
      if (err) console.error(err);
    
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Error deleting temp file: ${err}`);
      });
    });
  }
};

async function downloadImage(url, imagePath) {
  const axios = require('axios');
  const writer = fs.createWriteStream(imagePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
  }
