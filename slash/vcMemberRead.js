const fs = require('fs')

const run = async (client, interaction) => {
    const listPath = './vcmembers.txt'

    //check if file exists. Yes = read file, No = exception handling
    if(fs.existsSync(listPath)){
        const textFile = fs.readFileSync(listPath, {"encoding": "utf-8"})
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
    else{
        return interaction.reply('There has been no last voice-call list captured.')
    }

}


module.exports = {
    name: "vclist",
    description: "display the names of the last voice-call's participant capture",
    perm: "MODERATE_MEMBERS",
    run
}