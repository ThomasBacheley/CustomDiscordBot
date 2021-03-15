var Discord = require('discord.js')
const config = require('../../config.json')
const colors = require('colors')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	permission: "Developpeur",
	description: "reload toutes les commandes ou les fonctions",
	usage: config.prefix+this.name+" <cmd/command/f/function>",
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
							reloadallcmd(message,client)
						break;
						case 'command':
							reloadallcmd(message,client)
						break;
						case 'f':
							reloadallfunction(message,client)
						break;
						case 'function':
							reloadallfunction(message,client)
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


async function reloadallcmd(message,client){
	try{
		client.temp_cmd = client.commands;
		client.commands = new Discord.Collection()
		client.temp_cmd.forEach(cmd=>{
			delete require.cache[require.resolve(cmd.filepath)];
			const props = require(cmd.filepath)

			if(cmd.aliases){cmd.aliases.forEach(al=>{client.aliases.delete(al)})}
			client.commands.set(props.name, props);
			if(props.aliases){props.aliases.forEach(al=>{client.aliases.set(al,props)})}
		})
		client.temp_cmd = null
		client.log_embed(message.author.username,'Toutes les commandes ('+client.help_commands.size+') ont été reload')
		message.reply('Toutes les commandes ('+client.commands.size+') ont été reload').then(msg=>msg.delete({timeout:20000}))
	}catch(error){
		throw error
	}
}

async function reloadallfunction(message,client){
	try{
		client.fonctions.forEach(func=>{
			delete require.cache[require.resolve(func.info.filepath)];
			const props = require(func.info.filepath)
			
			client.fonctions.delete(props);
			client.fonctions.set(props.info.name,props);
		})

		client.log_embed(message.author.username,'Toutes les fonctions ('+client.fonctions.size+') ont été reload')
		message.reply('Toutes les fonctions ('+client.fonctions.size+') ont été reload').then(msg=>msg.delete({timeout:20000}))

	}catch(error){
		throw error
	}
}