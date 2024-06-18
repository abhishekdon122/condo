module.exports = {
	config: {
		name: "uptime",
		aliases: ["up", "upt"],
		version: "1.0",
		author: "Itachi",
		role: 0,
		shortDescription: {
			en: "Displays the uptime of the bot."
		},
		longDescription: {
			en: "Displays the amount of time that the bot has been running for."
		},
		category: "System",
		guide: {
			en: "Just type 'uptime' to display the uptime of the bot."
		}
	},
	onStart: async function () {
		// Empty onStart function to satisfy the system's requirement
	},
	onChat: async function ({ api, event }) {
		const message = event.body.toLowerCase().trim();

		// Check if the message matches the command or its aliases
		const commandMatches = ["uptime", "up", "upt"].includes(message);
		
		if (commandMatches) {
			const uptime = process.uptime();
			const seconds = Math.floor(uptime % 60);
			const minutes = Math.floor((uptime / 60) % 60);
			const hours = Math.floor((uptime / (60 * 60)) % 24);
			const days = Math.floor(uptime / (60 * 60 * 24));
			const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
			
			api.sendMessage(`Hello Abhishek Babe😈🤍

Your Bot Has been running for

${uptimeString}.`, event.threadID, event.messageID);
		}
	}
};
