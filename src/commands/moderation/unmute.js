const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class UnmuteCommand extends Command {
  constructor() {
    super("unmute", {
      aliases: ["unmute", "um"],
      category: "Moderation",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This command lets moderators remove themuted role to any member in a guild.",
        usage: "<member> [reason]",
        examples: ["@Clyde#0001"],
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
      userPermissions: ["MANAGE_ROLES"],
      clientPermissions: ["MANAGE_ROLES"],
    });
  }

  async exec(message, args) {
    if (!args.member) return message.reply("Please tag the user you want to perform this action on!");
    // if (!args.reason) return message.reply("Please enter a reason for this action!"); Not needed since there is a default
    if (!args.member.kickable) return message.reply("This user is unable to be unmuted due to them having higher privileges!");

    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Unmuted ${args.member.user.username}**__`);
      embed.setThumbnail(
        args.member.user.avatarURL()
          ? args.member.user.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
          : this.placeholder
      );
      embed.setDescription(stripIndents`<:success:877978497165963334> Successfully unmuted ${args.member}.\n
      **❯ Unmuted By:** ${message.author}\n**❯ Unmuted User ID:** ${args.member.user.id}`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    const channel = message.guild.channels.cache.find((channel) => channel.name === "mod-logs");
    await channel.send(embed);
    await args.member.send(`You was unmuted in **${message.guild}** by **${message.author}**`);
    let role = message.member.guild.roles.cache.find((role) => role.name === "Muted");
    message.guild.member(args.member).roles.remove(role);
    return message.channel.send({ embed });
  }
}

module.exports = UnmuteCommand;
