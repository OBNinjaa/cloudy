const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class AvatarCommand extends Command {
  constructor() {
    super("avatar", {
      aliases: ["avatar", "av"],
      category: "Information",
      description: {
        content: "This command lets you display any users avatar including your own.",
        usage: "<member>",
        examples: ["@Clyde#0001"],
        permissions: ["EMBED_LINKS"],
      },
      args: [
        {
          id: "member",
          type: "member",
          default: (message) => message.member,
        },
      ],
      clientPermissions: ["EMBED_LINKS"],
    });
    this.placeholder = "https://i.br4d.vip/G9SXe-5O.png";
  }

  async exec(message, args) {
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**Avatar For ${args.member.user.username}**__`);
      embed.setThumbnail(this.client.user.displayAvatarURL());
      embed.setDescription(stripIndents`**${args.member}**`);
      embed.setImage(
        args.member.user.avatarURL()
          ? args.member.user.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
          : this.placeholder
      );
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    return message.channel.send({ embed });
  }
}

module.exports = AvatarCommand;
