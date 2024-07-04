module.exports = {
  config: {
    name: "strangersgroupjoin",
    aliases: ["strangers", "gc", "joingc"],
    version: "1.0",
    author: "abhishek",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Add to Supportgc for admin support and approval" 
    },
    longDescription: { 
      en: "Join the support group chat"
    },
    category: "SUPPORT",
    guide: {
      en: "{pn}"
     }
  },
  onStart: async function({ api, event }) {
    const supportGroupId = "24099459503003301";

    if (event.threadID === supportGroupId) {
      api.sendMessage("⚠ | You are already in the support group.", event.threadID);
    } else {
      try {
        await api.addUserToGroup(event.senderID, supportGroupId);
        api.sendMessage("✅ | You have been added Strangers To Friend's group 🤍", event.threadID);
      } catch (error) {
        if (error.message === "Error: Add user to group: Action blocked") {
          api.sendMessage("❌ | Sorry, you can't be added to the group because of group settings.", event.threadID);
        } else {
          console.error(error);
          api.sendMessage("❌ | An error occurred while processing your request.", event.threadID);
        }
      }
    }
  }
};
