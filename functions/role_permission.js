const id = require('../config.json').id;
const colors = require('colors')
//--
module.exports = function(client,role_allowed,user){
	try{
		var role_pos = client.guilds.cache.get(id.server).roles.cache.find(role => role.name === role_allowed).position;
		var higher_role_u_pos = client.guilds.cache.get(id.server).members.cache.get(user.id).roles.highest.position;
		if(higher_role_u_pos>=role_pos){
			return true
		}else{
			return false
		}
	}catch(error){
		console.log(__filename.replace('/home/pi/CustomDiscordBot/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}

module.exports.info = {
	filepath: __filename,
	name:__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/').length-1],
	description: 'pour checker si la personne a bien le role necessaire'
}