const Discord = require("discord.js")


module.exports = {
    name: "messageCreate",
    run: async function runAll(bot, message) {
        const {client, prefix, owners} = bot
        if (!message.guild) return
        if (message.author.bot) return
        if (!message.content.startsWith(prefix)) return

        //take the prefix, trim any pre/post space and split into separate strings
        const args = message.content.slice(prefix.length).trim().split(/ +/g)

        //name of command, lower case if needed
        const cmdstr = args.shift().toLowerCase()

        //check versus command lists
        let command = client.commands.get(cmdstr)
        if (!command){
            return message.reply("This command does not exists.")
        }

        //check if user is bot owner
        let member = message.member
        if (command.devOnly && !owners.includes(member.id)){
            return message.reply("This command can only be used by the bot's owners.")
        }

        //check if user is missing permissions
        if (command.permissions && member.permissions.missing(command.permissions).length !== 0){
            return message.reply("You do not have sufficient priviledges for this command.")
        }

        //command
        try{
            await command.run({...bot, message, args})
        }
        catch(err){
            let errMsg = err.toString()
            if (errMsg.startsWith("?")){
                errMsg = errMsg.slice(1) //remove the "?"
                await message.reply(errMsg)
            }
            else console.error(err)
        }
    }
}