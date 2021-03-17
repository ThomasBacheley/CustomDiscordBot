const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,emoji=>{client.log(emoji.name+' ajouter au serveur '+emoji.guild.name,colors.cyan)})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}