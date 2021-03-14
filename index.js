console.clear();
let t_start = Date.now()
//#region Déclaration
const Discord = require('discord.js');
var client = new Discord.Client({partials: [ "REACTION", "MESSAGE", "CHANNEL" ]});
const config = require('./config.json');
const fs = require('fs')
var colors = require('colors')
var p_ms = require('pretty-ms')
var { DateTime } = require('luxon');
require('dotenv').config();

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
const cooldowns = new Discord.Collection();

client.fonctions = new Discord.Collection();
//#endregion

//#region initialion
client.login(process.env.TOKEN)
client.on('ready',async ()=>{
    try{
        await loadclientfunction(client);
        client.log('Démarrage.....',colors.yellow)
        client.user.setActivity(' de la documentation',{ type: 'WATCHING' })
        //--
        await loadfunction(client)
        await loadcmd(client)
        //--
        client.log(client.user.username+' s\'est lancé en '+p_ms(Date.now() - t_start),colors.green)
        //--
    }catch(error){
        console.error('ready : '+error);
        console.error(error.stack);
        return;
    }
})
//#endregion
//#region event
//#region emote
client.on('emojiCreate',emoji=>{client.log(emoji.name+' ajouter au serveur '+emoji.guild.name,colors.cyan)})
client.on('emojiDelete',emoji=>{client.log(emoji.name+' supprimer du serveur '+emoji.guild.name,colors.cyan)})
client.on('emojiUpdate',emoji=>{client.log(emoji.name+' update sur le serveur '+emoji.guild.name,colors.cyan)})
//#endregion
//#region Invitation
client.on('inviteCreate',invite=>{client.log_embed(invite.inviter.username,invite.inviter.tag + ' à creer une invitation ('+invite.code+') vers le channel '+invite.channel.toString()+' du serveur '+invite.guild.name)})
//#endregion
//#region erreur
process.on('unhandledRejection', (error,reason, promise) => {require('./functions/gestionErreur.js').rejection(error,reason,promise,client)});
process.on('uncaughtException', function(err) {
    var erreur_f = require('./functions/gestionErreur.js')
    switch(err.code){
        case 'ECONNRESET':
            erreur_f.known_error(err,client)
        break;
        case 'ECONNREFUSED':
            erreur_f.known_error(err,client)
        break;
        default:
            erreur_f.uncaught(err,client)
        break;
    }
});
//#endregion
//#endregion

//#region on.message
client.on('message',async message=>{
    try{
        if(message.author.bot || message.channel.type === 'dm') return;

        if(message.content.startsWith(config.prefix)||message.content.startsWith(config.prefix.toUpperCase())){

            var msgArray = message.content.split(" ")
            var command = msgArray[0]
            var args = msgArray.slice(1)

            var cmd = client.commands.get(command.slice(config.prefix.length)) || client.aliases.get(command.slice(config.prefix.length))

            if(cmd){
                if(message.author.id == config.id.owner){cmd.run(client,message,args)}//outre passé le cooldown
                else{
                    if (!cooldowns.has(cmd.name)) {cooldowns.set(cmd.name, new Discord.Collection());}
                    const now = Date.now();
                    const timestamps = cooldowns.get(cmd.name);
                    const cooldownAmount = (cmd.cooldown || config.default_cooldown) * 1000;
                    
                    if (timestamps.has(message.author.id)) {
                        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            return message.reply(`Patiente encore ${timeLeft.toFixed(1)}s avant de reutiliser la commande \`${cmd.name}\``);
                        }
                    }
                    timestamps.set(message.author.id, now);
                    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
                    cmd.run(client,message,args)
                }
            }
        }
    }catch(error){
        client.erreur(message,error,__filename)
    }
})
//#endregion

//#region fonctions
async function loadcmd(client){
    try{
        walkSync('./commands', function(filePath, stat) {
            var cmd_get = require('./'+filePath)
            client.commands.set(cmd_get.name, cmd_get);
            if(cmd_get.aliases){
                cmd_get.aliases.forEach(aliase=>{client.aliases.set(aliase, cmd_get);})
            }
        });

        client.log(colors.underline(client.commands.size)+' commandes chargées... !',colors.yellow)
        return true;
    }catch(error){
        throw error
    }
}

async function loadfunction(client){
    try{
        walkSync('./functions', function(filePath, stat) {
            var fget = require('./'+filePath)
            client.fonctions.set(fget.info.name,fget);
        });

        client.log(colors.underline(client.fonctions.size)+' fonctions chargées... !',colors.yellow)
        return true;
    }catch(error){
        throw error
    }
}

async function loadclientfunction(client){
    client.log = (msg,couleur) => {console.log(couleur('['+DateTime.now().toFormat('dd/LL HH:mm:ss')+'] '+msg))};
    client.erreur = (message,error,filename) => {client.fonctions.get('gestionErreur')(message,error,client,filename.replace('/home/pi/CustomDiscordBot/',''))};
    client.log_embed = (username,desc) => {
        var embed = new Discord.MessageEmbed().setColor(config.color).setTitle('De '+username).setDescription(desc);
        client.guilds.cache.get(config.id.server).channels.cache.get(config.id.log).send(embed);
        client.log(desc,colors.white)
    }
    return true
}

function walkSync(currentDirPath, callback) {
    var fs = require('fs'),
    path = require('path');
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}
//#endregion
