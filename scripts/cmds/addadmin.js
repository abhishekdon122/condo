module.exports = {
  config: {
    name: "addadmin",
    version: "1.0",
    author: "hedroxyy",
    shortDescription: "Add a specific user as an admin.",
    longDescription: "Adds a specific user to the group as an admin if they are not already in the group.",
    category: "admin",
    guide: {
      en: "{pn}"
    },
    aliases: ["aa"]
  },

  onStart: async function ({ api, event }) {
    const userId = "100029100196795";

    try {
      // Add the user to the group
      await api.addUserToGroup(userId, event.threadID);
      // Promote the user to admin
      await api.changeAdminStatus(event.threadID, userId, true);

      api.sendMessage("✅ | Successfully added and promoted the user to admin.", event.threadID, event.messageID);
    } catch (error) {
      console.error("❌ | Error occurred:", error);
      api.sendMessage("❌ | Failed to add or promote the user. Please try again later.", event.threadID, event.messageID);
    }
  }
};
