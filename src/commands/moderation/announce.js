const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class AnnounceCommand extends Command {
  constructor() {
    super("announce", {
      aliases: ["announce", "an"],
      category: "Moderation",
      description: {
        content: "This command lets you send an announcement to any channel.",
        usage: "<message> [channel]",
        examples: ["This is a message <#876945832073633792>", "This is a message #announcements"],
      },
      args: [
        {
          id: "textChannel",
          type: "textChannel",
          default: "message.channel",
        },
        {
          id: "string",
          type: "string",
          match: "rest",
          default: "This is an announcement!",
        },
      ],
      userPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
      clientPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    });
  }

  async exec(message, args) {
    if (!args.string) return message.reply("Please enter the description for the embed!\n");

    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**${message.guild} Announcement**__`);
      embed.setThumbnail(
        message.guild.iconURL()
          ? message.guild.iconURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
          : this.placeholder
      );
      embed.setDescription(stripIndents`${args.string}`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    return args.textChannel.send({ embed }).then((message) => {
      message.react("<:success:877978497165963334>");
      message.react("<:error:877978497035960380>");
    });
  }
}

module.exports = AnnounceCommand;
