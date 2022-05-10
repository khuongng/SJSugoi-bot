//wip
const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    return await interaction.reply("test eventnew");
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