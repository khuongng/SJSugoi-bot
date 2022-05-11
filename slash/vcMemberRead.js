const fs = require('fs')

const run = async (client, interaction) => {
    const textFile = fs.readFileSync('./vcmembers.txt', {"encoding": "utf-8"})

    try{

        return interaction.reply('Last voice-call capture:' + '\n' + '\n' + textFile)
    }
    catch(err){
            if(err){
                console.error(err)
                return interaction.reply(`Failed to list participants.`)
            }
    }
}


module.exports = {
    name: "vclist",
    description: "display the names of the last voice-call's participant capture",
    perm: "MODERATE_MEMBERS",
    run
}