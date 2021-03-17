const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,invite=>{
    client.log_embed(invite.inviter.username,invite.inviter.tag + ' à creer une invitation ('+invite.code+') vers le channel '+invite.channel.toString()+' du serveur '+invite.guild.name)
})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}