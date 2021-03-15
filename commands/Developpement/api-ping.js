const config = require('../../config.json')
//CODE
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases:['api-latence'],
	permission: "Humain(e)",
	description:  "pour connaitre le ping de l'API discord",
	usage: config.prefix+this.name,
	args:false,
	args_min:0,
	category: 'Developpement',
	bdd:false,
	async run(client,message,args) {
		try{
			message.delete({timeout:3000});
			if(client.fonctions.get('role_permission')(client,this.permission,message.author)){
				var rep = client.fonctions.get('check_args')(this.args,this.args_min,args);
				if(rep.erreur){
					message.reply(rep.message).then(msg=>msg.delete({timeout:15000}))
				}else{
					var latence = client.ws.ping
					var txt = latence+'ms de latence pour l\'API Discord'
					if(latence>=config.ping_stat.moyen){
						txt += client.emojis.cache.get('812036571116732466').toString();
					}else{
						if(latence>=config.ping_stat.bon){
							txt += client.emojis.cache.get('812036571385167872').toString();
						}else{
							txt += client.emojis.cache.get('812036571066400800').toString();
						}
					}
					message.reply(txt).then(msg=>msg.delete({timeout:30000}))
				}		
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
};