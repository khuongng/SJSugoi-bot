const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: {
            channel: interaction.channel
        }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})

    const resumed = new MessageEmbed()
        .setDescription(`Track is already playing`)

    if(client.player.paused === true) return await interaction.reply({embeds: [resumed]})
    
    queue.setPaused(false)

    const resumeMsg = new MessageEmbed()
        .setDescription(`Resumed **${queue.current.title}**`)
        .setURL(`${queue.current.url}`)

    await interaction.reply({embeds: [resumeMsg]})
}

module.exports = {
    name: "resume",
    description: "Resumes current track",
    run
}