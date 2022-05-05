const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: { channel: interaction.channel }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})

    const paused = new MessageEmbed()
        .setDescription(`Track is already paused`)

    if(client.player.paused === true) return await interaction.reply({embeds: [paused]})
    
    queue.setPaused(true)

    const pauseMsg = new MessageEmbed()
        .setDescription(`Paused **${queue.current.title}**`)
        .setURL(`${queue.current.url}`)

    await interaction.reply({embeds: [pauseMsg]})
}

module.exports = {
    name: "pause",
    description: "Pauses current track",
    run
}