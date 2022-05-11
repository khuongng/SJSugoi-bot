const { channel } = require('diagnostics_channel');
const fs = require('fs')

const run = async (client, interaction) => {

    //get current date+time
    let current = new Date(); 
    let cDate = (current.getMonth() + 1) + '-' + current.getDate() + '-' + current.getFullYear();
    //format time to be in two digits (hr:mm:ss)
    let hr = ('0'+current.getHours()).slice(-2);
    let mm = ('0'+current.getMinutes()).slice(-2);
    let ss = ('0'+current.getSeconds()).slice(-2);
    let cTime = hr + ":" + mm + ":" + ss; //time string
    let dateTime = cDate + ' ' + cTime;

    //get each participant's names
    let vc = interaction.options.getChannel("channel") //selected channel
    const nameArray = vc.members.map(name => name.displayName) //display nickname (if any)
    const memberArray = vc.members.map(member => member.user.tag) //username+ID
    let memberString = dateTime + '\n' + '#' + vc.name + '\n'

    //format the name strings to look nice
    let memberSorted = new Array() //new array to combine displayName and tag
    for (let i = 0; i < memberArray.length; i++){
        memberSorted[i] = nameArray[i] + ' (' + memberArray[i] + ')'
        memberString = memberString + memberSorted[i] + '\n' //add each user, then newline
    }

    //check if channel selected is a voice channel. Yes = capture, No = exception handling
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
        return interaction.reply(`This command only works with voice channels.`)
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