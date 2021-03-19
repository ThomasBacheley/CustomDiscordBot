const colors = require('colors');

const { client } = require("../../index");

client.on('emojiDelete',emoji=>{client.log(emoji.name+' supprimer du serveur '+emoji.guild.name,colors.cyan)})