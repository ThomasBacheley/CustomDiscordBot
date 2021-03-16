const config = require('../../config.json')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases:['new','news'],
	permission: "2 Queues",
	description: "recupere le RSS de bbc new concernant les technologie",
	usage: config.prefix+this.name,
	args:false,
	args_min:0,
	category: 'Utile',
	bdd:false,
	async run(client,message,args) {
		try{
			message.delete({timeout:3000});
			if(client.fonctions.get('role_permission')(client,this.permission,message.author)){
				var rep = client.fonctions.get('check_args')(this.args,this.args_min,args);
				if(rep.erreur){
					message.reply(rep.message).then(msg=>msg.delete({timeout:15000}))
				}else{
					let Parser = require('rss-parser');
					let parser = new Parser();
					let feed = await parser.parseURL('http://feeds.bbci.co.uk/news/technology/rss.xml');
					//---
					const {MessageEmbed} = require('discord.js')
					var embed = new MessageEmbed()
					.setColor(config.color)
					.setTitle('Dernière nouveauté')
					.addField(feed.items[0].title,'[lien]('+feed.items[0].link+')')
					.addField(feed.items[1].title,'[lien]('+feed.items[1].link+')')
					.addField(feed.items[2].title,'[lien]('+feed.items[2].link+')');

					message.channel.send(embed).then(msg=>msg.delete({timeout:60000}))
				}
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
			
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
}