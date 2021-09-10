// const { Listener } = require("discord-akairo");
// const { stripIndents } = require("common-tags");
// const { MessageEmbed } = require("discord.js");
// const AntiSwear = require("ez-antiswear"),
//   filterEN = new AntiSwear("en");
// const db = require("quick.db");

// class SwearDetect extends Listener {
//   constructor() {
//     super("SwearDetect", {
//       event: "message",
//       emitter: "client",
//     });
//   }

//   async exec(message) {
//     if (message.member.hasPermission("ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_MESSAGES", "KICK_MEMBERS", "BAN_MEMBERS")) return;
//     if (!message.guild) return;
//     const embed = new MessageEmbed();
//     {
//       embed;
//       embed.setTitle("Stop Swearing!");
//       embed.setThumbnail(message.author.displayAvatarURL());
//       embed.setDescription(stripIndents`Stop swearing dumbass!`);
//       embed.setTimestamp();
//       embed.setColor("#ff946e");
//       embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());

//       if (!message.guild || !message.content) return;
//       if (filterEN.check(message.content.toLowerCase())) {
//         const embedLog = new MessageEmbed();
//         {
//           embedLog;
//           embedLog.setTitle(`Member Warned | ${message.author.username}`);
//           embedLog.setThumbnail(message.author.displayAvatarURL());
//           embedLog.setDescription(stripIndents`**${message.author.username}** has been warned for using profanity in ${message.channel}
//           **❯ Message Content:** \`\`${message.content}\`\``);
//           embedLog.setTimestamp();
//           embedLog.setColor("#ff946e");
//           embedLog.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
//         }

//         message.channel.send(embed);
//         const channel = message.guild.channels.cache.find((channel) => channel.name === "mod-logs");
//         if (!channel) return;
//         channel.send(embedLog);

//         return message.delete();
//       }
//     }
//   }
// }

// module.exports = SwearDetect;
