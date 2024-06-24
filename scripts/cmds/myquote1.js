const axios = require('axios');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

module.exports = {
  config: {
    name: "myquote1",
    aliases: ["mq1"],
    version: "1.0",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    shortDescription: "quote img",
    longDescription: "create your quoted image",
    category: "fun",
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const input = args.join(' ').split('=');

    if (input.length !== 2) {
      api.sendMessage('To use this command, simply type “MyQuote [text] = [author]”...', threadID, messageID);
      return;
    }

    const [quoteText, authorName] = input.map((item) => item.trim());

    if (!quoteText || !authorName) {
      api.sendMessage('Both quote text and author name are required.', threadID, messageID);
      return;
    }

    try {
      const backgroundLinks = [
        'https://aurl.bz/STj1Yhw',
      ];

      const randomBackground = backgroundLinks[Math.floor(Math.random() * backgroundLinks.length)];
      const background = await loadImage(randomBackground);

      const canvas = createCanvas(background.width, background.height);
      const ctx = canvas.getContext('2d');

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 29px Serif';
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const maxLineWidth = 300;
      const lineHeight = 35;
      const lines = [];
      let line = '';

      const words = quoteText.split(' ');

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const testLineWidth = ctx.measureText(testLine).width;

        if (testLineWidth > maxLineWidth) {
          lines.push(line.trim());
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      const textY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, textY + index * lineHeight);
      });

      ctx.font = '25px Times New Roman';
      ctx.fillText(`${authorName}`, canvas.width / 2, canvas.height - 49);

      const imageBuffer = canvas.toBuffer();
      const tempFilePath = 'temp_quote.jpg';
      fs.writeFileSync(tempFilePath, imageBuffer);

      api.sendMessage(
        {
          attachment: fs.createReadStream(tempFilePath),
        },
        threadID,
        (err, messageInfo) => {
          fs.unlinkSync(tempFilePath);

          if (err) {
            console.error(err);
            api.sendMessage('An error occurred while sending the image.', threadID, messageID);
          }
        },
        messageID
      );

    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while generating the image.', threadID, messageID);
    }
  },
};
