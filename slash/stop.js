const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    
    const queue = client.player.getQueue(interaction.guild, {
        metadata: { channel: interaction.channel }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue) return await interaction.reply({embeds: [noTrack]})
    queue.destroy()

    const stopMsg = new MessageEmbed()
        .setDescription(`Music player stopped and cleared`)

    await interaction.reply({embeds: [stopMsg]})


}

module.exports = {
    name: "stop",
    description: "Stops the music player and clears the queue",
    run
}