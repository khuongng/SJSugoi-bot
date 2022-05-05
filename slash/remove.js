const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: {channel: interaction.channel}
    })

    const qPosition = interaction.options.getInteger("queue-position")

    const noNum = new MessageEmbed()
        .setDescription(`Invalid number. Please try again.`)

    if(qPosition > queue.tracks.length) return await interaction.reply({embeds: [noNum]})

    let rTrack = queue.tracks[qPosition].title
    const rMsg = new MessageEmbed()
        .setDescription(`Removed ${rTrack}`)
    
    queue.remove(qPosition - 1)
    await interaction.reply({embeds: [rMsg]})
    
}

module.exports = {
    name: "remove",
    description: "Remove track based on queue position",
    options: [
        {
            name: "queue-position",
            description: "Position on queue",
            type: "INTEGER",
            required: true
        }
    ],run
}