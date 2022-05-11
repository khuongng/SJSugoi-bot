const { channel } = require('diagnostics_channel');
const fs = require('fs')

const run = async (client, interaction) => {
    let current = new Date(); //get current date+time
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;

    let vc = interaction.options.getChannel("channel") //selected channel
    const nameArray = vc.members.map(name => name.displayName) //display nickname (if any)
    const memberArray = vc.members.map(member => member.user.tag) //username+ID
    let memberString = dateTime + '\n' + '#' + vc.name + '\n'

    let memberSorted = new Array() //new array to combine displayName and tag
    for (let i = 0; i < memberArray.length; i++){
        memberSorted[i] = nameArray[i] + ' (' + memberArray[i] + ')'
        memberString = memberString + memberSorted[i] + '\n' //add each user, then newline
    }


    if (vc.type == "GUILD_VOICE"){
        try{
            fs.writeFileSync('./vcmembers.txt', memberString) //write whole string to file
            return interaction.reply(`Voice channel's participants captured.`)
        }
        catch(err){
                if(err){
                    console.error(err)
                    return interaction.reply(`Failed to capture voice channel.`)
                }
        }
    }
    else{
        return interaction.reply(`This command only work with voice channels.`)
    }

}


module.exports = {
    name: "vcmember",
    description: "capture the current participants in a voice call",
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