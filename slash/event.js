//wip
const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    return await interaction.reply(`test event`);
}

module.exports = {
    name: "event",
    description: "Posts the text associated with a previously-created event",
    options: [
        {
            name: "name",
            description: "The name of the event text to playback",
            type: "STRING",
            required: true
        }
    ],
    run
}