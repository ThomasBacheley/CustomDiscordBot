const colors = require('colors');

const { client } = require("../../index");

client.on('guildBanAdd',(guild,user)=>{
    console.log(user.tag+' banni de '+guild.name)
})