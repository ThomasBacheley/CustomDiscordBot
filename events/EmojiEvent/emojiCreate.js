const colors = require('colors');

const { client } = require("../../index");

client.on('emojiCreate',emoji=>{client.log(emoji.name+' ajouter au serveur '+emoji.guild.name,colors.cyan)})