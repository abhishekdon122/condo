const fs = require('fs'); 

module.exports = {
  config: {
    name: "owner",
    version: "1.4",
    author: "Tero bau",
    countDown: 5,
    role: 0,
    shortDescription: {
      vi: "",
      en: "Sends information about the owner."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the owner. "
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
    const authorAge = "20";
    const authorInsta = " 🙈 ";
    const status = "🆂🅸🅽🅶🅻🅴 ";
    const country = " 🅽🅴🅿🅰🅻 🇳🇵";
      
message.reply({
      body: `===「 Owner Info 」===\n❏AuthorName: ${ownerName}\n❏Age: ${authorAge}\n❏Insta: ${authorInsta}\n❏Status: ${status}\n❏ Country: ${country}
\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`});
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
