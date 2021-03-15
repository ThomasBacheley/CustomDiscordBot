const fs = require('fs')
const config = require('../../config.json')
//---
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases:['rpi_temperature','rasp_temp'],
	permission: "5 Queues",
	description: "Affiche la temperature du CPU de la raspberry",
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
					var cpu = (Math.floor(fs.readFileSync('/sys/class/thermal/thermal_zone0/temp','utf8')/1000))+2
					message.reply('CPU à `'+cpu+'` C° ').then(msg=>msg.delete({timeout:30000}))
				}
				
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
			
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
}