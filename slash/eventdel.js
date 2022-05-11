//wip
const { MessageEmbed } = require('discord.js');
const filestore = require('../handlers/filestore.js');

const run = async (client, interaction) => {
    //if(interaction.isAutoComplete()){console.log("autocomplete interaction"); return;}
    let name = interaction.options.getString("name")
    let oldtext = filestore.getevent(name);
    if(oldtext){
        filestore.delevent(name);
        return await interaction.reply("Deleting event \""+ name + "\". Deleted content:\n>>> " + oldtext);
    } else {
        return await interaction.reply(name + " is not a stored event.");
    }
}

module.exports = {
    name: "eventdel",
    description: "Deletes a previously created event",
    options: [
        {
            name: "name",
            description: "The name of the event text to delete",
            type: "STRING",
            required: true
        }
    ],
    //autocomplete: true,
    run
}