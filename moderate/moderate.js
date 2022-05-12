var Filter = require('bad-words');
const {MessageEmbed} = require("discord.js")
module.exports = (client) => {
    let filter = new Filter();
    const deleteEmbed = new MessageEmbed()
    .setAuthor({name:'Channel Moderator', iconURL:'https://img.icons8.com/doodle/48/000000/siren--v1.png'})
    .setTitle('WARNING!!!')
    .setDescription('***OFFENSIVE LANGAUAGE DETECTED!*** \n\n **MESSAGE DELETED!**')
    .setTimestamp()
    .setImage('https://i.ibb.co/9nr58cb/My-project.jpg')
    .setColor('RED')

    client.on("message", (message) =>{
            //alert a user
        if(filter.isProfane(message.content)){
            const badWord = message.content;
            message.channel.send(`<@${message.author.id}>`);
            message.channel.send({embeds:[deleteEmbed]})
            message.delete(); 

            //generate a log in test log
            const log = new MessageEmbed()
            .setAuthor({
                name: message.author.tag, 
                iconURL:message.author.displayAvatarURL({dynamic:true})
            })
            .setDescription(`sent a message including bad words in ${message.channel} => \`${badWord}\``)
            .setTimestamp()
            .setColor('RED')
            const LogChannel = message.guild.channels.cache.find(channel => channel.name === 'test-log');
            LogChannel.send({embeds:[log]});
        }
    })
}
