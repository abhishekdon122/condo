const axios = require('axios');

module.exports = {
  config: {
    name: "ai",
    version: "1.0.0",
    author: "Fahim_Noob",
    description: "Ask AI a question",
    role: 0,
    category: "ai",
    guide: {
      en: "{p}{n} <question> to ask AI a question.",
    },
  },
  onStart: async function ({ message, usersData, event, api, args }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];

      // Check if the user provided a question
      if (args.length === 0) {
        // If no question provided, reply with a prompt
        message.reply("Please provide a question to ask the AI.");
        return;
      }

      const question = args.join(" ");
      const encodedQuestion = encodeURIComponent(question);
      
      const response = await axios.get(`https://smfahim.onrender.com/hercai?ask=${encodedQuestion}`);

      if (response.status !== 200) {
        throw new Error('API error');
      }

      const aiResponse = response.data.answer; // Assuming the API returns an 'answer' field

      message.reply({
        body: `${aiResponse}`,
        mentions: ment,
      }, (err, info) => {
        if (err) return console.error(err);
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
      message.reply("Sorry, there was an error processing your request.");
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const question = args.join(" ");
      const encodedQuestion = encodeURIComponent(question);
      
      const response = await axios.get(`https://smfahim.onrender.com/hercai?ask=${encodedQuestion}`);

      if (response.status !== 200) {
        throw new Error('API error');
      }

      const aiResponse = response.data.answer; // Assuming the API returns an 'answer' field

      message.reply({
        body: `${aiResponse}`,
        mentions: ment,
      }, (err, info) => {
        if (err) return console.error(err);
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
      message.reply("Sorry, there was an error processing your request.");
    }
  }
};

// Initialize global.GoatBot.onReply if not already initialized
if (!global.GoatBot) {
  global.GoatBot = { onReply: new Map() };
} else if (!global.GoatBot.onReply) {
  global.GoatBot.onReply = new Map();
}
