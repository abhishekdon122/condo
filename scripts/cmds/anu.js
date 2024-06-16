module.exports = {
	config: {
			name: "anu",
			version: "1.0",
			author: "D_S",
			countDown: 5,
			role: 0,
			shortDescription: "",
			longDescription: "",
			category: "bot",
	},
onStart: async function(){}, 
onChat: async function({
	event,
	message,
	getLang
}) {
	if (event.body && event.body.toLowerCase() == "bot") return message.reply("yes.. 🥳❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "good morning") return message.reply("good morning..🌄❤️‍🩹");
	if (event.body && event.body.toLowerCase() == "abhishek") return message.reply("Girlfriend Sanga Bg Hunuxa");
	if (event.body && event.body.toLowerCase() == "lado") return message.reply("tei ley tero aama lai garyera ta yetro vako hos😘😈");
	if (event.body && event.body.toLowerCase() == "good night") return message.reply("good night 💤🌙");
	if (event.body && event.body.toLowerCase() == "hi") return message.reply("yes...🥳");
	if (event.body && event.body.toLowerCase() == "hello") return message.reply("◡̈⋆ʜᴇʟʟᴏ(●’◡’●)ﾉ");
	if (event.body && event.body.toLowerCase() == "how are you") return message.reply("fine and you..?");
 }
};
