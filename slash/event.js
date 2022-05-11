//wip
const { MessageEmbed } = require('discord.js');
const filestore = require('../handlers/filestore.js');

const run = async (client, interaction) => {
    let name = interaction.options.getString("name")
    let content = filestore.getevent(name)
    if(content){
        return await interaction.reply({embeds: [new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(name)
            .setDescription(content)
        ]});
    } else {
        return await interaction.reply(name + " is not a stored event.");
    }
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