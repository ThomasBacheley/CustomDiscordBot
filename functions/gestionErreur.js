const Discord = require('discord.js');
const config = require('../config.json')
const colors = require('colors')
var { DateTime } = require('luxon');
//--
module.exports = async function(message,error,client,filename){
	try{
		message.reply('Une erreur est survenue, Les Développeurs vont se charger de la corriger au plus vite').then(msg=>msg.delete({timeout:30000}))

		console.log(colors.red('['+DateTime.now().toFormat('dd/LL HH:mm:ss')+'] Le message `'+message.content+'` à causer l\'erreur suivante : \n'+error.message+'\n\nDans le fichier '+filename+'\n\nPlus d\'info:\n'+error.stack))

		var embed = new Discord.MessageEmbed()
		.setColor(config.color)
		.setTimestamp()
		.setAuthor('Erreur causer par '+message.author.tag,message.author.displayAvatarURL({format:'png',dynamic:true,size:64}))
		.setFooter('Dans le fichier : '+filename)
		.setDescription('Le message `'+message.content+'` a causé l\'erreur suivante : \n\n'+error.message+'\n\n'+error.stack.split('\n')[1]+' & '+ error.stack.split('\n')[2]+'\n\n\n[Lien d\'aide](http://www.google.com/search?q='+error.code+')');

		client.guilds.cache.get(config.id.server).channels.cache.get(config.id.log).send(embed);

	}catch(error){
		console.log(__filename.replace('/home/pi/Tsuku/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}

module.exports.info = {
	filepath: __filename,
	name:__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/')[__filename.replace('/home/pi/CustomDiscordBot/functions/','').replace('.js','').split('/').length-1],
	description: 'pour gerer les Erreurs'
}

module.exports.uncaught = async function(error,client){
	try{
		

		console.log(colors.red('['+DateTime.now().toFormat('dd/LL HH:mm:ss')+'] Une erreur est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur:'+error.message))

		var embed = new Discord.MessageEmbed()
		.setColor(config.color)
		.setTimestamp()
		.setDescription('Une erreur est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur:\n'+error.message+'\n\n\n[Lien d\'aide](http://www.google.com/search?q='+error.code+')')

		client.guilds.cache.get(config.id.server).channels.cache.get(config.id.log).send(embed);

	}catch(error){
		console.log(__filename.replace('/home/pi/CustomDiscordBot/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}

module.exports.known_error = async function(error,client){
	try{
		console.log(colors.red('['+DateTime.now().toFormat('dd/LL HH:mm:ss')+'] Une erreur connue est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur :'+error.message))

		var embed = new Discord.MessageEmbed()
		.setColor(config.color)
		.setTimestamp()
		.setDescription('Une erreur connue est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur:\n'+error.message+'\n\n\n[Lien d\'aide](http://www.google.com/search?q='+error.code+')')

		client.guilds.cache.get(config.id.server).channels.cache.get(config.id.log).send(embed);
	}catch(error){
		console.log(__filename.replace('/home/pi/CustomDiscordBot/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}

module.exports.rejection = async function(error,reason,promise,client){
	try{
		console.log(colors.red('['+DateTime.now().toFormat('dd/LL HH:mm:ss')+'] Une erreur "rejection" est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur :'+error.message))

		var embed = new Discord.MessageEmbed()
		.setColor(config.color)
		.setTimestamp()
		.setDescription('Une erreur "rejection" est survenue avec le code d\'erreur suivant : `'+error.code+'`.\n\nMessage d\'erreur:\n'+error.message+'\n\n\n[Lien d\'aide](http://www.google.com/search?q='+error.code+')')

		client.guilds.cache.get(config.id.server).channels.cache.get(config.id.log).send(embed);

		console.log(promise);
		console.log(reason);
		console.log(error);
		console.log('------------------------------------------------')
	}catch(error){
		console.log(__filename.replace('/home/pi/CustomDiscordBot/','')+' Une erreur est survenue :\n'+colors.red(error.message))
	}
}