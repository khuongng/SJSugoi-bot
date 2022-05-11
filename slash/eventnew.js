//wip
const { MessageEmbed } = require('discord.js');
const filestore = require('../handlers/filestore.js');

const run = async (client, interaction) => {
    let name = interaction.options.getString("name")
    let content = interaction.options.getString("content")
    filestore.createevent(name, content);
    return await interaction.reply("test: new event \""+ name + "\" with content \"" + content + "\"");
}

module.exports = {
    name: "eventnew",
    description: "Creates a new event with associated text",
    options: [
        {
            name: "name",
            description: "The name of the event text to create",
            type: "STRING",
            required: true
        }, 
        {
            name: "content",
            description: "The associated text to play back later",
            type: "STRING",
            required: true
        }
    ],
    run
}