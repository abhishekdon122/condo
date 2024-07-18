const axios = require('axios');

module.exports = {
    config: {
        name: "glen",
        aliases: ["lens"],
        version: "1.0",
        author: "Samir Œ",
        countDown: 5,
        role: 0,
        description: {
            vi: "Tìm kiếm hình ảnh và hiển thị kết quả từ URL",
            en: "Search for images and display results from source URL"
        },
        category: "𝗨𝗧𝗜𝗟𝗜𝗧𝗬",
    },
    onStart: async function ({ api, args, message, event }) {
        let imageUrl;

        if (event.messageReply && event.messageReply.attachments.length > 0) {
            imageUrl = event.messageReply.attachments[0].url;
        } else if (args.length > 0) {
            imageUrl = args[0];
        } else {
            return message.reply({ body: "Please reply to an image or provide an image URL." });
        }

        try {
            const response = await axios.post('https://tanvir-dot.onrender.com/lens', {
                image: imageUrl
            });

            const results = response.data;
            const maxResults = Math.min(results.length, 6);
            const randomCount = Math.floor(Math.random() * maxResults) + 1;
            const randomResults = results.slice(0, randomCount);

            if (randomResults.length > 0) {
                const trackInfo = randomResults.map((result, index) => 
                    `${index + 1}. ${result.title}\nURL: ${result.link}\n`
                ).join("\n\n");

                const thumbnails = randomResults.map(result => result.thumbnail);

                // Log the thumbnail URLs
                console.log("Thumbnails:", thumbnails);

                const attachments = await Promise.all(
                    thumbnails.map(async thumbnail => {
                        try {
                            const stream = await global.utils.getStreamFromURL(thumbnail);
                            return stream;
                        } catch (error) {
                            console.error("Error fetching thumbnail:", error);
                            return null;
                        }
                    })
                ).then(res => res.filter(Boolean)); // Filter out any null values

                // Log the attachments
                console.log("Attachments:", attachments);

                if (attachments.length > 0) {
                    await message.reply({
                        body: `${trackInfo}`,
                        attachment: attachments
                    });
                } else {
                    message.reply({ body: "No images could be fetched." });
                }
            } else {
                message.reply({ body: "No results found for the given image." });
            }
        } catch (error) {
            console.error(error);
            message.reply({ body: "An error occurred while fetching image search results." });
        }
    }
};
