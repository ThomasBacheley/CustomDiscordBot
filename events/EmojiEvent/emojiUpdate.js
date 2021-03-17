const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,emoji=>{client.log(emoji.name+' update sur le serveur '+emoji.guild.name,colors.cyan)})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}