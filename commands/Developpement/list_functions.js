const Discord = require('discord.js')
const config = require('../../config.json')

module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases:['lf','liste_fonctions',],
	permission: "Developpeur",
	description: "Affiche la liste des fonctions",
	usage: config.prefix+this.name,
	args:false,
	args_min:0,
	category: 'Developpement',
	bdd:false,
	async run(client,message,args) {
		try{
			message.delete({timeout:3000});
			if(role_permission(client,this.permission,message.author)){var rep = check_args(this.args,this.args_min,args);
				if(rep.erreur){
					message.reply(rep.message).then(msg=>msg.delete({timeout:15000}))
				}else{
					var embed = new Discord.MessageEmbed()
					.setColor(config.color)
					.setTitle('Fonctions de CustomDiscordBot');
					client.fonctions.forEach(f=>{embed.addField(f.info.name,f.info.description)})
					message.reply(embed).then(msg=>{msg.delete({timeout:60000})})
				}	
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
}


var colors = require('colors')