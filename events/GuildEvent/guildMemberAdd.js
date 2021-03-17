const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,member=>{
    console.log(member.tag+' à rejoint le serveur')
})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}