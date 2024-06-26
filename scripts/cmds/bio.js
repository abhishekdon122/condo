module.exports = {
  config: {
    name: "setbio",
    author: "[GoatAI | Eldwin]",
    aliases: ["bio"],
    role: 2,
    shortDescription: {
      en: "Change the bot's bio.",
      tl: "Baguhin ang bio ng bot."
    },
    longDescription: {
      en: "This command allows you to change the bot's bio.",
      tl: "Ang command na ito ay nagbibigay-daan sa iyo na baguhin ang bio ng bot."
    },
    category: "OWNER",
    guide: {
      en: "{p}changeBio <newBio>",
      tl: "{p}changeBio <bagongBio>"
    }
  },

  onStart: async function({ event, message, args, api }) {
    if (args.length < 1) {
      message.reply("Please provide a new bio for the bot.");
      return;
    }

    const newBio = args.join(" ");
    const userId = await api.getCurrentUserID();

    api.changeBio(newBio, userId, (err) => {
      if (err) {
        message.reply("An error occurred while changing the bot's bio.");
        console.error(err);
      } else {
        message.reply("The bot's bio has been updated successfully.");
      }
    });
  }
};
