const durations = [
    {name: "60s", value: 60*1000},
    {name: "5m", value: 5*60*1000},
    {name: "10m", value: 10*60*1000},
    {name: "30m", value: 30*60*1000},
    {name: "1h", value: 60*60*1000},
    {name: "1d", value: 24*60*60*1000},
    {name: "1w", value: 7*24*60*60*1000},
]

const run = async (client, interaction) => {
    let member = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("duration")
    let reason = interaction.options.getString("reason") || "No reason given."

    if(!member) return interaction.reply("No such member.")
    try{
        await member.timeout(duration, reason)
        return interaction.reply(`${member.user.tag} has been timed out for ${durations.find(d=> duration === d.value)?.name} with the following reason: ${reason}`)
    }
    catch(err){
            if(err){
                console.error(err)
                return interaction.reply(`Failed to timeout ${member.user.tag}`)
            }
    }
}

module.exports = {
    name: "timeout",
    description: "timeout a member",
    perm: "MODERATE_MEMBERS",
    options: [
        {
            name: "user",
            description: "the user to timeout",
            type: "USER",
            required: true
        },
        {
            name: "duration",
            description: "timeout duration",
            type: "NUMBER",
            choices: durations,
            required: true
        },
        {
            name: "reason",
            description: "reason for timeout",
            type: "STRING",
            required: false
        }
    ],run
}