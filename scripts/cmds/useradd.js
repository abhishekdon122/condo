module.exports = {
    config: {
        name: "useradd",
        aliases: ["uadd"],
        version: "1.0",
        author: "hedroxyy",
        countDown: 1,
        role: 2,
        shortDescription: "Add a user to the group chat",
        longDescription: "",
        category: "Utility",
        guide: {
            vi: "{pn} {profile link/uid} to add a user to the group chat",
            en: "{pn} {profile link/uid} to add a user to the group chat"
        }
    },
    onStart: async function ({ api, message, args, event }) {
        if (args.length < 1) return message.reply("Please provide a profile link or user ID.");

        const userInput = args[0];
        let userId;

        if (userInput.includes("facebook.com")) {
            const regex = /profile.php\?id=(\d+)|\/(\d+)/;
            const match = userInput.match(regex);
            if (match) {
                userId = match[1] || match[2];
            } else {
                return message.reply("❌ | Invalid profile link provided.");
            }
        } else {
            userId = userInput;
        }

        try {
            const threadInfo = await api.getThreadInfo(event.threadID);
            const currentMembers = threadInfo.participantIDs;

            if (currentMembers.includes(userId)) {
                return message.reply(`❌ | User is already in the group chat.`);
            }

            await api.addUserToGroup(userId, event.threadID);
            message.reply(`✅ | User has been added to the group chat.`);
        } catch (error) {
            message.reply(`❌ | Failed to add user to the group chat.`);
        }
    }
};
