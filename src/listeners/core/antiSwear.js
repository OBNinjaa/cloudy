// const { Listener } = require("discord-akairo");
// const fetch = require("node-fetch");
// const { MessageEmbed } = require("discord.js");
// const { stripIndents } = require("common-tags");

// class AntiSwear extends Listener {
//   constructor() {
//     super("AntiSwear", {
//       event: "message",
//       emitter: "client",
//     });
//   }

//   async exec(message) {
//     let blacklisted = ["make", "your", "own", list];
//     let foundInText = false;
//     for (var i in blacklisted) {
//       if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
//     }
//     if (foundInText) {
//       message.delete();
//       const embed = new MessageEmbed();
//       {
//         embed;
//         embed.setTitle(`__**Profanity Detected | ${message.member.user.username}**__`);
//         embed.setThumbnail(
//           message.member.user.avatarURL()
//             ? message.member.user.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
//             : this.placeholder
//         );
//         embed.setDescription(stripIndents`${message.member} Was warned for swearing in ${message.channel}.\n
//         **❯ Content:** ${message.content}\n**❯ User ID:** ${message.member.user.id}\n**❯ Warns:** MongoDB Broken!\n`);
//         embed.setColor("#ff946e");
//         embed.setTimestamp();
//         embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
//       }
//       const channel = message.guild.channels.cache.find((channel) => channel.name === "mod-logs");
//       await channel.send(embed);
//       message.channel.send(`Stop swearing! - ${message.member}`);
//     }
//   }
// }

// module.exports = AntiSwear;
