const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player");

const run = async (client, interaction) => {
    const queue = client.player.createQueue(interaction.guild, {
        metadata: {
            channel: interaction.channel,
        }
    })

    try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
        queue.destroy();
        return await interaction.reply({ content: "You must be in a voice chanel!", ephemeral: true });
    }

    let search = interaction.options.getString("search")
    const track = await client.player.search(search, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
    });

    if (track.tracks.length === 0) return await interaction.reply(`Track not found`)
    await queue.addTrack(track.tracks[0])

    await interaction.deferReply()
    if(!queue.playing) await queue.play();
    
    const embed = new MessageEmbed()
        .setDescription(`**${track.tracks[0].title}**\nAdded to queue from ${track.tracks[0].source}`)

    await interaction.editReply({embeds: [embed]})
}

module.exports = {
    name: "play",
    description: "Plays a song!",
    options: [
        {
            name: "search",
            description: "The media you want to play",
            type: "STRING",
            required: true
        }
    ],run
}
