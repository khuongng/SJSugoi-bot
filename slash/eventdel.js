//wip
const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    return await interaction.reply("test eventdel");
}

module.exports = {
    name: "eventdel",
    description: "Deletes a previously created event",
    options: [
        {
            name: "name",
            description: "The name of the event text to delete",
            type: "STRING",
            required: true
        }
    ],
    run
}