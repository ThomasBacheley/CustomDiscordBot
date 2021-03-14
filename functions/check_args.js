const config = require('../config.json');
const colors = require('colors')

module.exports = function(args_requis,args_min,args){
	try{
		var response = {
			"erreur":false
		}
		if(args_requis){
			if(args.length<args_min){
				response['erreur'] = true;
				response['message'] = 'pas assez d\'arguments rentrer ('+args_min+' arguments minimum)';
			}
		}
		return response;
	}catch(error){
		console.log(__filename.replace('/home/pi/CustomDiscordBot/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}

module.exports.info = {
	filepath: __filename,
	name:__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/').length-1],
	description: 'pour checker si il manque des arguments à la commande'
}