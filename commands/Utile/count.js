const config = require('../../config.json')
//
module.exports = {
	filepath: __filename,
	name: __filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/commands/','').replace('.js','').split('/').length-1],
	aliases: ["compte"],
	permission: "2 Queues",
	description: "compte le nombre de caractere dans ta phrase (espace inclus)",
	usage: config.prefix+this.name+" <msg>",
	args:true,
	args_min:1,
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
					var arr = args.join(' ').split('')
					message.reply('Ton message contient `'+arr.length+'` caractères').then(msg=>msg.delete({timeout:5000}))
				}
			}else{
				message.reply('tu n\'as pas le rôle pour utiliser cette commande AKA le role `'+this.permission+'`').then(msg=>msg.delete({timeout:10000}))
			}
			
		}catch(error){
			client.erreur(message,error,__filename)
		}
	}
}