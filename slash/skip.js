const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: { channel: interaction.channel }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})
    
    queue.skip()

    const skipMsg = new MessageEmbed()
        .setDescription(`Skipped track`)

    await interaction.reply({embeds: [skipMsg]})
}

module.exports = {
    name: "skip",
    description: "Skips to next track in queue",
    run
}