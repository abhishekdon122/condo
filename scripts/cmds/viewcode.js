const axios = require('axios');
module.exports = {
  config: {
    name: 'viewcode',
    aliases: ['viewcode'],
    version: '1.0',
    author: 'Vex_Kshitiz',
    role: 0,
    category: 'utils',
    shortDescription: {
      en: '.'
    },
    longDescription: {
      en: 'view code inside of link'
    },
    guide: {
      en: '{pn} viewcode [Pastebin link]'
    }
  },
  onStart: async function ({ api, event, args, message }) {
    let pastebinUrl = args[0];
    if (!pastebinUrl && event.messageReply) {
      const repliedMessage = event.messageReply;
      const match = repliedMessage.body.match(/\bhttps?:\/\/\S+/gi);
      if (match && match.length > 0) {
        pastebinUrl = match[0];
      }
    }

    if (!pastebinUrl) {
      return message.reply(`Please provide a Pastebin link`);
    }

    try {
      const response = await axios.get(pastebinUrl);
      const codeContent = response.data;

      message.reply(`\n\`\`\`\n${codeContent}\n\`\`\``);
    } catch (error) {
      console.error('Error', error.message);
      message.reply('error.');
    }
  }
};
