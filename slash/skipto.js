const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: {channel: interaction.channel}
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})

    const qPosition = interaction.options.getInteger("queue-position")

    const noNum = new MessageEmbed()
        .setDescription(`Invalid number. Please try again.`)

    if(qPosition > queue.tracks.length) return await interaction.reply({embeds: [noNum]})

    let skipTrack = queue.tracks[qPosition - 1].title
    queue.skipTo(qPosition - 1)
    const skiptoMsg = new MessageEmbed()
        .setDescription(`Skipped to **${skipTrack}**`)
    
    await interaction.reply({embeds: [skiptoMsg]})
    
}

module.exports = {
    name: "skipto",
    description: "Skip to track based on queue position",
    options: [
        {
            name: "queue-position",
            description: "Position on queue",
            type: "INTEGER",
            required: true
        }
    ],run
}