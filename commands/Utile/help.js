const Discord = require('discord.js');

const config = require('../../config.json')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases: ['aide'],
	permission: "Humain(e)",
	description: "Affiche l\'aide sur les commandes",
	usage: config.prefix+this.name,
	args: true,
	args_min: 0,
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
					var embed = new Discord.MessageEmbed();
					embed.setColor(config.color)
					if(args==0){
						embed.setTitle('Liste commandes');
						
						client.commands.forEach(cmd=>{
							if(checkpos(client,cmd.permission,message.member)){
								var cd = cmd.cooldown || config.default_cooldown
								embed.addField(cmd.name+' ('+cd+'s)',cmd.description);
							}
						});
						embed.setFooter('$.help <cmd>');
					}else{
						var cmd = client.commands.get(args[0]) || client.aliases.get(args[0])
						if(cmd!=null){
							embed.setTitle('Info '+cmd.name);
							embed.setDescription(cmd.description);
							//---
							embed.addField('Categorie',cmd.category,true);
							embed.addField('Accessible a partir du role',cmd.permission,true);
							//---
							var als = "";
							if(!cmd.aliases){als="Aucun"}
							else{
								cmd.aliases.forEach(al=>{als+=al+', '});
								als = als.substring(0, als.length-2);
							}
							embed.addField('Aliase(s)',als);
							//---
							embed.addField('argument',cmd.args,true);	
							embed.addField('argument(s) minimum',cmd.args_min,true);
						}else{embed = 'La commande n\'as pas été trouvée';}
					}
					message.reply(embed).then(msg=>msg.delete({timeout:30000}))
				}
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
}

function checkpos(client,cmd_role,member){
	try{
		var cmd_role_pos = client.guilds.cache.get(config.id.server).roles.cache.find(r=>r.name === cmd_role).position
		var member_highest_r_pos = member.roles.highest.position;
		if(member_highest_r_pos>=cmd_role_pos){
			return true
		}else{
			return false
		}
	}catch(error){
		throw error
	}
}