const colors = require('colors');

const { client } = require("../../index");

client.on('guildMemberAdd',member=>{
    console.log(member.tag+' à rejoint le serveur')
})