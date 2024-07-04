const fs = require('fs');

module.exports = {
  config: {
    name: "owner",
    version: "1.4",
    author: "Abhishek Dahal ",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "lado kha muji",
      en: "Sends information about the owner."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the owner."
    },
    category: "Information",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message, api, event, usersData }) {
    const ownerUid = 100029100196795;
    const ownerData = await usersData.get(ownerUid);
    const ownerName = ownerData.name;
    const authorAge =  "Sweet 10";
    const authorInsta = " abhishekeyy.69 ";
    const status ="Single 💔";
    const country =" Nepal ";

    message.reply({
      body: `===「 Owner Info 」===\n Name: ${ownerName}\n Age: ${authorAge}\n Insta: ${authorInsta}\n Status: ${status}\n Country: ${country}\n`,
      mentions: [{
        id: ownerUid,
        tag: ownerName
      }]
    });
  },

  onChat: async function({ event, message, usersData }) {
    if (event.body && event.body.toLowerCase() === "owner") {
      this.onStart({ message, api, event, usersData });
    }
  }
};
