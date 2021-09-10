const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class ReportCommand extends Command {
  constructor() {
    super("report", {
      aliases: ["report"],
      channel: "guild",
      category: "Utilities",
      cooldown: 20000,
      ratelimit: 3,
      description: {
        content:
          "This command is for those members who wan't to report a user for anything. This command will create a channel that only you and the moderators can see.",
        usage: "[reason]",
        examples: ["Abuse in DM!", "DM advertising"],
      },
      args: [
        {
          id: "reason",
          type: "string",
          match: "rest",
          default: "No reason provided",
        },
      ],
    });
  }

  async exec(message, args) {
    await message.delete();
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Report From ${message.member.user.username}**__`);
      embed.setThumbnail(message.member.user.displayAvatarURL());
      embed.setDescription(stripIndents`Thank you for creating a report ${message.member}. Please wait for staff to respond so that we can deal with your issue. After you have done with this report simply react below.\n
      **❯ Report Reason:** ${args.reason}`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }

    message.guild.channels
      .create(`❌-${message.author.username}-report`, {
        reason: `${args.reason}`,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then((channel) => channel.send(embed))
      .then((message) => {
        message.react("🗑");
        this.client.on("messageReactionAdd", (reaction, user) => {
          // on vérifie que ce soit bien la bonne réaction et on ne compte pas celui du bot
          if (reaction.emoji.name === "🗑" && user.id !== this.client.user.id) {
            message.channel.delete();
          }
        });
      });
  }
}

module.exports = ReportCommand;
