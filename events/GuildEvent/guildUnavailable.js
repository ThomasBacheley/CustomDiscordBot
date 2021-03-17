const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,(guild)=>{client.users.cache.get('663153459226345501').send('Le serveur '+guild.name+' est indisponible !')})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}