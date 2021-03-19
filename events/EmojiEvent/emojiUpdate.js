const colors = require('colors');

const { client } = require("../../index");

client.on('emojiUpdate',emoji=>{client.log(emoji.name+' update sur le serveur '+emoji.guild.name,colors.cyan)})