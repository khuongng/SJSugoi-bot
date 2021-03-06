const Discord = require("discord.js")
require("dotenv").config()

const child_process = require('child_process');
child_process.execSync('node ./loadslash.js');

const {Client, Intents} = require("discord.js")
const {Player} = require("discord-player")

const client = new Discord.Client({
    intents: [
        "GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"
    ]
})

let bot = {
    client,
    prefix: "su.",
    owners: ["287905034656677888"]
}

client.player = new Player(client)

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot,reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate", (message) =>{
//     if (message.content == "ping"){
//         message.reply("pong")
//     }

// })

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return
    if(!interaction.inGuild()) return interaction.reply("This can only be used in a server.")

    const slashcmd = client.slashcommands.get(interaction.commandName)
    if(!slashcmd) return interaction.reply("Invalid slash command.")
    if(slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply("No permissions.")
    slashcmd.run(client, interaction)
})
require('./moderate/moderate')(client);
client.login(process.env.TOKEN)