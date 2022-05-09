const fs = require('fs')

const run = async (client, interaction) => {
    let vc = interaction.options.getChannel("channel")
    const nameArray = vc.members.map(name => name.displayName)
    const memberArray = vc.members.map(member => member.user.tag)
    const memberString = [nameArray, memberArray].join('\n')

    try{
        fs.writeFileSync('./vcmembers.txt', memberString)
        return interaction.reply(`Voice channel's participants captured.`)
    }
    catch(err){
            if(err){
                console.error(err)
                return interaction.reply(`Failed to capture voice channel.`)
            }
    }
}


module.exports = {
    name: "vcmember",
    description: "capture the current members in a voice call",
    perm: "MODERATE_MEMBERS",
    options: [
        {
            name: "channel",
            description: "voice channel to capture",
            type: "CHANNEL",
            required: true
        }
    ],run
}