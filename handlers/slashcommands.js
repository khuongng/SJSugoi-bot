const fs = require("fs")

const getFiles = (path, ending) => {
    return fs.readdirSync(path).filter(f => f.endsWith(ending))
}

module.exports = (bot, reload) => {
    const {client} = bot
    let slashcommands = getFiles("./slash/", ".js")
    if (slashcommands.length === 0)
        console.log("There are no slash commands available.")
    slashcommands.forEach(f =>{
        if(reload) delete require.cache[require.resolve(`../slash/${f}`)]
        const slashcmd = require(`../slash/${f}`)
        client.slashcommands.set(slashcmd.name, slashcmd)
    })
    console.log(`Loaded ${client.slashcommands.size} slash command(s)`)
}