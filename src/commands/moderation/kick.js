const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class KickCommand extends Command {
  constructor() {
    super("kick", {
      aliases: ["kick", "k"],
      category: "Moderation",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "This command lets moderators kick users from the server. They will receive a message with whatever you put in the final [reason] argument.",
        usage: "<member> [reason]",
        examples: ["@Clyde#0001 Swore in chat!", "@Clyde#0001 Toxic Kid!"],
      },
      args: [
        {
          id: "member",
          type: "member",
          default: null,
        },
        {
          id: "reason",
          type: "string",
          match: "rest",
          default: "No reason provided",
        },
      ],
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
    });
  }

  async exec(message, args) {
    if (!args.member) return message.reply("Please tag the user you want to perform this action on!");
    // if (!args.reason) return message.reply("Please enter a reason for this action!"); Not needed since there is a default
    if (!args.member.kickable) return message.reply("This user is unable to be kicked due to them having higher privileges!");

    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Kicked ${args.member.user.username} From The Guild**__`);
      embed.setThumbnail(
        args.member.user.avatarURL()
          ? args.member.user.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
          : this.placeholder
      );
      embed.setDescription(stripIndents`<:success:877978497165963334> Successfully kicked ${args.member} from the guild.\n
      **❯ Reason:** ${args.reason}\n**❯ Kicked By:** ${message.author}\n**❯ Kicked User ID:** ${args.member.user.id}`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    const channel = message.guild.channels.cache.find((channel) => channel.name === "mod-logs");
    await channel.send(embed);
    await args.member.send(`You was kicked from **${message.guild}** by **${message.author}** for **${args.reason}**`);
    await args.member.kick({ reason: args.reason });
    return message.channel.send({ embed });
  }
}

module.exports = KickCommand;
