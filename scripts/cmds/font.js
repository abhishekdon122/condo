const axios = require('axios');

module.exports = {
  config: {
    name: "font",
    version: "1.0",
    author: "hedroxyy",
    shortDescription: "Fetch and display fonts.",
    longDescription: "Fetches and displays various fonts for the provided text using the specified number.",
    category: "tools",
    guide: {
      en: "{pn} {number}|{text}"
    },
    aliases: ["f"]
  },

  onStart: async function ({ message, args }) {
    const input = args.join(' ').split('|');
    if (input.length !== 2) {
      return message.reply("Please provide a number and text in the format: .font {number}|{text}");
    }

    const [number, text] = input;
    const num = parseInt(number, 10);

    if (isNaN(num) || num < 1 || num > 35) { // Based on the number of results in the example provided
      return message.reply("Please provide a valid number between 1 and 35.");
    }

    try {
      const apiUrl = `https://joshweb.click/api/font?q=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);

      if (response.status === 200 && response.data && response.data[num - 1] && response.data[num - 1].result) {
        message.reply(response.data[num - 1].result);
      } else {
        message.reply("Failed to fetch the font. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching font from API:", error);
      message.reply("Failed to fetch the font. Please try again later.");
    }
  }
};
