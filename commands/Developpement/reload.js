var Discord = require('discord.js')
const config = require('../../config.json')
const colors = require('colors')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	permission: "Developpeur",
	description: "reload une commande ou une fonction",
	usage: config.prefix+this.name+" <cmd/command/f/function> <cmd_name/function_name>",
	args:true,
	args_min:1,
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
					switch(args[0]){
						case 'cmd':
							reloadcmd(message,client,args[1])
						break;
						case 'command':
							reloadcmd(message,client,args[1])
						break;
						case 'f':
							reloadfunction(message,client,args[1])
						break;
						case 'function':
							reloadfunction(message,client,args[1])
						break;
						default:
							message.reply('Je n\'ai pas compris ce que tu a voulu reload').then(msg=>msg.delete({timeout:20000}))
						break;
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


async function reloadcmd(message,client,cmd_name){
	try{
		var cmd = client.commands.get(cmd_name) || client.aliases.get(cmd_name)
		if(cmd){
			delete require.cache[require.resolve(cmd.filepath)];
			const props = require(cmd.filepath)

			client.commands.delete(props);
						
			if(cmd.aliases){cmd.aliases.forEach(al=>{client.aliases.delete(al)})}
			//---
			client.commands.set(props.name, props);
			
			if(props.aliases){props.aliases.forEach(al=>{client.aliases.set(al,props)})}
			message.reply('La commande `'+props.name+'` à été rechargé !').then(msg=>msg.delete({timeout:20000}))
			client.log_embed(message.author.username,'La commande '+props.name+' à été reload')
		}else{
			message.reply('la commande n\'as pas été trouvé').then(msg=>msg.delete({timeout:15000}))
		}
	}catch(error){
		throw error
	}
}

async function reloadfunction(message,client,function_name){
	try{
		var func = client.fonctions.get(function_name)
		if(func){
			delete require.cache[require.resolve(func.info.filepath)];
			const props = require(func.info.filepath)
			
			client.fonctions.delete(props);
			client.fonctions.set(props.info.name,props);
			//---
			message.reply('La fonction `'+props.info.name+'` à été rechargé !').then(msg=>msg.delete({timeout:20000}))
			client.log_embed(message.author.username,'La fonction '+props.info.name+' à été reload')
		}else{
			message.reply('la fonction n\'as pas été trouvé').then(msg=>msg.delete({timeout:15000}))
		}
	}catch(error){
		throw error
	}
}