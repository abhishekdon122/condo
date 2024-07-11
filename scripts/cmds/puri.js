const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "puri",
    aliases: [""], // Corrected alias syntax
    version: "1.0",
    author: "OTINXSANDIP",
    countDown: 5,
    role: 0,
    shortDescription: " ",
    longDescription: "",
    category: "love",
    guide: "{pn}"
  },

  onStart: async function({ api, event, threadsData, usersData }) {
    const { threadID, senderID } = event;
    const { participantIDs } = await api.getThreadInfo(threadID);
    
    // Generate a random percentage for demonstration
    var tle = Math.floor(Math.random() * 101);
    
    // Get sender's and a random participant's names
    var namee = (await usersData.get(senderID)).name;
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID && ID != senderID);
    var id = listUserID[Math.floor(Math.random() * listUserID.length)];
    var name = (await usersData.get(id)).name;
    
    // Array to store tags
    var arraytag = [
      { id: senderID, tag: namee },
      { id: id, tag: name }
    ];

    // Fetch sender's and participant's avatars and save them locally
    await Promise.all([
      axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })
        .then(response => fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(response.data, "binary"))),
      axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })
        .then(response => fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(response.data, "binary")))
    ]);

    // Fetch and save the love gif locally
    let gifLove = await axios.get(`https://i.ibb.co/y4dWfQq/image.gif`, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/giflove.gif", Buffer.from(gifLove.data, "binary"));

    // Prepare array of read streams for attachments
    var imglove = [
      fs.createReadStream(__dirname + "/cache/avt.png"),
      fs.createReadStream(__dirname + "/cache/giflove.gif"),
      fs.createReadStream(__dirname + "/cache/avt2.png")
    ];

    // Prepare the message object to send
    var msg = {
      body: `Successful pairing!\n😻 Wish you two hundred years of happiness\n💋 Double ratio: ${tle}%\n${namee} 🤍 ${name}`,
      mentions: arraytag,
      attachment: imglove
    };

    // Send the message with attachments
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};
