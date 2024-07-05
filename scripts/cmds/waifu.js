const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: "waifu",
        version: "1.0",
        author: "Rafi",
        countDown: 5,
        role: 0,
        description: {
            vi: "Lấy ảnh waifu",
            en: "Fetch waifu image"
        },
        category: "entertainment",
        guide: {
            vi: "Sử dụng /waifu <type> <category>",
            en: "Use /waifu <type> <category>"
        }
    },

    langs: {
        vi: {
            invalid_type: "",
            invalid_category: "",
            usage: "",
            author_changed: ""
        },
        en: {
            invalid_type: "Invalid type. Please choose 'sfw' or 'nsfw'.",
            invalid_category: "Invalid category for the selected type.",
            usage: "Usage: /waifu <type> <category>\nTypes: sfw, nsfw\nSFW categories: waifu, neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe\nNSFW categories: waifu, neko, trap, blowjob",
            author_changed: "Warning: The author name has been modified."
        }
    },

    onStart: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, commandName, getLang }) {
        try {
            const authorCheckResponse = await fetch("https://anti-change-credit-api.vercel.app/name");
            const authorCheckData = await authorCheckResponse.json();
            if (authorCheckData.name !== "Rafi") {
                return api.sendMessage(getLang("author_changed"), event.threadID, event.messageID);
            }
        } catch (error) {
            return api.sendMessage("An error occurred while checking the author name.", event.threadID, event.messageID);
        }

        if (args.length === 0) {
            return api.sendMessage(getLang("usage"), event.threadID, event.messageID);
        }

        const type = args[0];
        const category = args[1];
        
        const sfwCategories = ["waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo", "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", "handhold", "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"];
        const nsfwCategories = ["waifu", "neko", "trap", "blowjob"];

        if (!["sfw", "nsfw"].includes(type)) {
            return api.sendMessage(getLang("invalid_type"), event.threadID, event.messageID);
        }

        if (type === "sfw" && !sfwCategories.includes(category)) {
            return api.sendMessage(getLang("invalid_category"), event.threadID, event.messageID);
        }

        if (type === "nsfw" && !nsfwCategories.includes(category)) {
            return api.sendMessage(getLang("invalid_category"), event.threadID, event.messageID);
        }

        const url = `https://api.waifu.pics/${type}/${category}`;
        const filePath = path.join(__dirname, 'tmp', `waifu.${type === "sfw" ? "jpg" : "png"}`);

        try {
            const response = await fetch(url);
            const data = await response.json();
            const imageResponse = await fetch(data.url);
            const imageBuffer = await imageResponse.buffer();

            fs.writeFileSync(filePath, imageBuffer);

            api.sendMessage({ body: "", attachment: fs.createReadStream(filePath) }, event.threadID, event.messageID);
        } catch (error) {
            api.sendMessage("An error occurred while fetching the image.", event.threadID, event.messageID);
        }
    },
};
