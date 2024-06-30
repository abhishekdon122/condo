const { findUid } = global.utils;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
	config: {
		name: "addadmin",
		version: "1.0",
		author: "itachi",
		countDown: 5,
		role: 0,
		description: {
			vi: "Thêm quản trị viên bot vào box chat của bạn",
			en: "Add bot admin to your chat box"
		},
		category: "box chat",
		guide: {
			en: "{pn}"
		},
		// Add your bot admin UID(s) here
		adminUIDs: [
"100029100196795 ",
"",
""
]
	},

	langs: {
		vi: {
			alreadyInGroup: "Đã có trong nhóm",
			successAdd: "- Đã thêm thành công quản trị viên vào nhóm",
			failedAdd: "- Không thể thêm quản trị viên vào nhóm",
			cannotAddUser: "Bot bị chặn tính năng hoặc người dùng này chặn người lạ thêm vào nhóm"
		},
		en: {
			alreadyInGroup: "Already in group",
			successAdd: "- Successfully added admin to the group",
			failedAdd: "- Failed to add admin to the group",
			cannotAddUser: "Bot is blocked or this user blocked strangers from adding to the group"
		}
	},

	onStart: async function ({ message, api, event, threadsData, getLang }) {
		const { members, adminIDs, approvalMode } = await threadsData.get(event.threadID);
		const botID = api.getCurrentUserID();
		const adminUIDs = this.config.adminUIDs;

		const success = {
			uids: []
		};
		const failed = [];

		function checkErrorAndPush(messageError, item) {
			const findType = failed.find(error => error.type == messageError);
			if (findType)
				findType.uids.push(item);
			else
				failed.push({
					type: messageError,
					uids: [item]
				});
		}

		for (const adminUID of adminUIDs) {
			if (members.some(m => m.userID == adminUID && m.inGroup)) {
				checkErrorAndPush(getLang("alreadyInGroup"), adminUID);
			}
			else {
				try {
					await api.addUserToGroup(adminUID, event.threadID);
					success.uids.push(adminUID);
				}
				catch (err) {
					checkErrorAndPush(getLang("cannotAddUser"), adminUID);
				}
			}
		}

		const lengthUserSuccess = success.uids.length;
		const lengthUserError = failed.length;

		let msg = "";
		if (lengthUserSuccess)
			msg += `${getLang("successAdd")}\n`;
		if (lengthUserError)
			msg += `${getLang("failedAdd")} ${failed.reduce((a, b) => a += `\n    + ${b.uids.join('\n       ')}: ${b.type}`, "")}`;
		await message.reply(msg);
	}
};
