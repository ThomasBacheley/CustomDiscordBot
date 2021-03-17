const colors = require('colors');

const { client } = require("../../index");

client.on(this.name,(guild,user)=>{
    console.log(user.tag+' banni de '+guild.name)
})

module.exports = {
    name:__filename.split('/')[__filename.split('/').length-1].replace('.js','')
}