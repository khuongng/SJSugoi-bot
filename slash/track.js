const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: { channel: interaction.channel }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks playing`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})

    
    let progressBar = queue.createProgressBar({
        length: 20
    })
    
    const trackMsg = new MessageEmbed()
        .setTitle(`${queue.current.title}`)
        .setURL(`${queue.current.url}`)
        .setDescription(`Added to queue from ${queue.current.source} by ${queue.current.requestedBy}`)
        .setThumbnail(`${queue.current.thumbnail}`)
        .addField(`${progressBar} ${queue.current.duration}`,`\u200b`)

    await interaction.reply({embeds: [trackMsg]})
}

module.exports = {
    name: "track",
    description: "Information about current track",
    run
}