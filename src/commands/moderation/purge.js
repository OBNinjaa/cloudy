const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class PurgeCommand extends Command {
  constructor() {
    super("purge", {
      aliases: ["purge", "prune", "clear"],
      category: "Moderation",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content:
          "purge command, you can delete a number of messages from a channel. You can also use the --bot flag to only delete messages sent by bots.",
        extended: "If you want to delete only bot messages you can use the flag `--bot`",
        usage: "[amount]",
        examples: ["50", "100 --bot"],
        permissions: ["MANAGE_MESSAGES"],
      },
      args: [
        {
          id: "amount",
          type: "integer",
          default: null,
        },
        {
          id: "botFlag",
          match: "flag",
          flag: "--bot",
        },
      ],
      userPermissions: ["MANAGE_MESSAGES"],
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async exec(message, { amount, botFlag }) {
    if (!amount) {
      return message.reply("Please input a valid amount that is less than 100");
    }
    if (amount > 100) {
      return message.reply("Please input a valid amount that is less than 100");
    }
    await this.bulkDeleteHandler(message, parseInt(amount.toString().replace(/-/g, "")), botFlag);
  }
  async bulkDeleteHandler(message, limit, bot) {
    await message.delete();
    if (!bot) {
      try {
        message.channel.bulkDelete(limit, true);
        const embed = new MessageEmbed();
        {
          embed;
          embed.setTitle(`__**${message.author.username} Cleared The Channel**__`);
          // embed.setThumbnail(message.author.displayAvatarURL({ format: "png" }));
          embed.setThumbnail(
            message.author.avatarURL()
              ? message.author.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
              : this.placeholder
          );
          embed.setDescription(stripIndents`<:success:877978497165963334> Successfully cleared ${limit} message${limit === 1 ? "" : "s"}`);
          embed.setColor("#ff946e");
          embed.setTimestamp();
          embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        }
        return message.channel.send(embed).then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 3000);
        });
      } catch (e) {
        return message.channel.send(e.message);
      }
    } else {
      message.channel.messages.fetch({ limit: limit + 1 }).then(async (m) => {
        if (m.filter((m) => m.author.bot).size < 1) {
          return message.channel.send(`❌ | There are no messages to delete!`);
        }
        message.channel.bulkDelete(
          m.filter((m) => m.author.bot).map((m) => m.id),
          true
        );
        const embed = new MessageEmbed();
        {
          embed;
          embed.setTitle(`__**${message.author.username} Cleared The Channel**__`);
          // embed.setThumbnail(message.author.displayAvatarURL({ format: "png" }));
          embed.setThumbnail(
            message.author.avatarURL()
              ? message.author.avatarURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
              : this.placeholder
          );
          embed.setDescription(stripIndents`successfully cleared **\`${m.size - 1}\`** message${limit === 1 ? "" : "s"} from bots`);
          embed.setColor("#ff946e");
          embed.setTimestamp();
          embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        }
        return message.channel.send(embed).then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 10000);
        });
      });
    }
  }
};
