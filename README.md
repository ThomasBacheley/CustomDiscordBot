# CustomDiscordBot
Ce bot à pour but de m'entrainer au développement **javascript** avec discord.
# But
Le bot peut :
 - Jouer de la musique.
 - Récuperer des photos de pingouin ou de renard
 - Récuperer des informations du serveur discord via une API personnalisé
# Modules
Ci dessous une liste des modules utilisés par le bot (disponible [ici](https://github.com/ThomasBacheley/CustomDiscordBot/blob/main/package.json "package.json")):
 - "colors": "^1.4.0"
 - "discord.js": "^12.5.1"
 - "dotenv": "^8.2.0"
 - "express": "^4.17.1"
 - "luxon": "^1.26.0"
 - "pretty-ms": "^7.0.1"
 - "uuid": "^8.3.2"
 # Databases
 Le bot possède une base personnalisé héberger en local dont il a l'accès administrateur ainsi qu'a une base utilisé pour mes autres projets.
 # API
 Le bot à un serveur express qui tourne en fond pour permettre de récupérer des données ( ex : température de la raspberry sur laquelle il est héberger, nombre d'utilisateur dans le serveur discord, son package.json ) sécurisé par l'utilisation d'une API key ( générer grâce à uuid ).