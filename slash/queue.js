const { MessageEmbed } = require('discord.js');

const run = async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild, {
        metadata: { channel: interaction.channel }
    })

    const noTrack = new MessageEmbed()
        .setDescription(`No tracks in queue`)

    if(!queue || !queue.playing) return await interaction.reply({embeds: [noTrack]})

    const noQueue = new MessageEmbed()
        .addFields(
            {name: `**Currently Playing**`, value: `${queue.current.title}`},
            {name: `**In Queue**`, value: `No tracks in queue`},
        )
    if(!queue.tracks[0]) return await interaction.reply({embeds: [noQueue]})

    const tracks = queue.tracks.slice(0,10).map((track, i) => {
        return `${i + 1}. **[${track.title}](${track.url})** -- ${track.requestedBy}`
    }).join('\n')
    

    const queueMsg = new MessageEmbed()
        .addFields(
            {name: `**Currently Playing**`, value: `${queue.current.title}`},
            {name: `**In Queue**`, value: `${tracks}`},
        )

    await interaction.reply({embeds: [queueMsg]})
}

module.exports = {
    name: "queue",
    description: "Displays the queue",
    run
}