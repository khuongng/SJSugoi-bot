const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client
}


const guildId = "882333284837781505"

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("ready", async() => {
    const guild = client.guilds.cache.get(guildId)
    if (!guild)
        return console.error("Guild not found.")

    await guild.commands.set([...client.slashcommands.values()])
    console.log(`Successfully loaded ${client.slashcommands.size}`)
    process.exit(0)
})

client.login(process.env.TOKEN)