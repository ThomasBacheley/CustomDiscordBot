const Discord = require('discord.js');
var fetch = require('node-fetch')

const config = require('../../config.json')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	permission: "1 Queue",
	description: "Affiche une image de Renard",
	usage: config.prefix+this.name,
	args: false,
	args_min: 0,
	category: 'Fun',
	bdd:false,
	async run(client,message,args) {
		try{
			message.delete({timeout:3000});
			if(client.fonctions.get('role_permission')(client,this.permission,message.author)){
				var rep = client.fonctions.get('check_args')(this.args,this.args_min,args);
				if(rep.erreur){
					message.reply(rep.message).then(msg=>msg.delete({timeout:15000}))
				}else{
					fetch('https://randomfox.ca/floof/').then(res => res.json()).then(json => message.channel.send(new Discord.MessageAttachment(json.image,'fox.png')));
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