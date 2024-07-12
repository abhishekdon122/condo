const fs = require('fs');
const moment = require('moment-timezone');
const NepaliDate = require('nepali-date');

module.exports = {
  config: {
    name: "info",
    version: "1.3",
    author: "AceGun",
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
    const authorName = "Abhishek Dahal"; // Removed unnecessary $
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
    const uptimeString = `${hours}hrs: ${minutes}min: ${seconds}sec`;

    // Replace `ownerUid` and `ownerName` with appropriate values
    const ownerUid = '100029100196795';
    const ownerName = 'Abhishek Dahal';

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
      mentions: [{
        id: ownerUid,
        tag: ownerName
      }]
    });
  },

  onChat: async function ({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "test") {
      await this.onStart({ message });
    }
  }
};
