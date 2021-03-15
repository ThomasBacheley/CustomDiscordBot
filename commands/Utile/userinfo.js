const Discord = require('discord.js');

const config = require('../../config.json')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases:["uinfo","uinf","whois"],
	permission: "Modérateur / Modératrice",
	description: "Pour recuperer des informations sur un utilisateur",
	usage: config.prefix+this.name+" <mention>",
	args: true,
	args_min: 1,
	category: 'Informations',
	bdd:false,
	async run(client,message,args) {
		try{
			message.delete({timeout:3000});
			if(client.fonctions.get('role_permission')(client,this.permission,message.author)){
				var rep = client.fonctions.get('check_args')(this.args,this.args_min,args);
				if(rep.erreur){
					message.reply(rep.message).then(msg=>msg.delete({timeout:15000}))
				}else{
					if(message.mentions.users.first()){
						var user = message.mentions.users.first()
						var member = message.guild.members.cache.get(user.id)
						var embed = new Discord.MessageEmbed()
						.setColor(config.color)
						.setTitle('Informations Utilisateur');
						//---
						var void_emote = client.emojis.cache.get('812328772639785030').toString();
						//---
						embed.addField('ID:',user.id,true)
						embed.addField('Avatar:','[Lien]('+user.displayAvatarURL()+')',true)
						embed.addField('Tag:',user.tag,true)
						embed.addField(void_emote,void_emote,false)
						embed.addField('Compte creer le:',dateProcess(user.createdAt),true)
						embed.addField('A rejoint le:',dateProcess(member.joinedAt),true);
						//--
						var act = user.presence.activities[0]
						if(act!=undefined){
							embed.addField('Statut:',act.name+': '+act.state,true)
						}

						embed.setThumbnail(user.displayAvatarURL({size:128}))

						message.reply(embed)
					}else{
						message.reply('Tu n\'a mentionner personne !').then(msg=>msg.delete({timeout:30000}))
					}
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

function dateProcess(d) {
	function pad(s) { return (s < 10) ? '0' + s : s; }
	return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }