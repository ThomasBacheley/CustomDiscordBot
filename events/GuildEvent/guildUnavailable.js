const colors = require('colors');

const { client } = require("../../index");

client.on('guildUnavailable',(guild)=>{client.users.cache.get('663153459226345501').send('Le serveur '+guild.name+' est indisponible !')})