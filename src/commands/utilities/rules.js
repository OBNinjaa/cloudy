const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

class RulesCommand extends Command {
  constructor() {
    super("rules", {
      aliases: ["rules", "rs"],
      channel: "guild",
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This command automatically sets up some rules for your guild if you're in need of them.",
        usage: "[channel]",
        examples: ["#rules", "<#876922851901464607>"],
      },
      args: [
        {
          id: "channel",
          type: "textChannel",
          default: null,
        },
      ],
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async exec(message, args) {
    await message.delete();
    await message.reply(`Success rules have been setup in ${args.channel}`);
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**${message.guild.name} Guidelines**__`);
      // embed.setThumbnail(message.author.displayAvatarURL({ format: "png" }));
      embed.setThumbnail(
        message.guild.iconURL()
          ? message.guild.iconURL({ size: 512, dynamic: true }).replace(/webm/g, "gif").replace(/webp/g, "png")
          : this.placeholder
      );
      embed.setDescription(stripIndents`**1. Follow Discord's TOS**
      ❯ https://discordapp.com/terms
      ❯ https://discordapp.com/guidelines
      
      **2. Be respectful with all members**
      ❯ Be respectful to others , No death threats, sexism, hate speech, racism (NO N WORD, this includes soft N)
      ❯ No doxxing, swatting, witch hunting
      
      **3. No Advertising**
      ❯ Includes DM Advertising. We do not allow advertising here of any kind.
      
      **4. No NSFW content**
      ❯ Anything involving gore or sexual content is not allowed.
      ❯ NSFW = Not Safe for Work
      
      **5. No spamming in text or VC**
      ❯ Do not spam messages, soundboards, voice changers, or earrape in any channel.
      
      **6. Do not discuss about sensitive topics**
      ❯ This isn't a debating server, keep sensitive topics out of here so we don't have a ton of nasty arguments.
      
      **7. No malicious content**
      ❯ No grabify links, viruses, crash videos, links to viruses, or token grabbers. These will result in an automated ban.
      
      **8. No Self Bots**
      ❯ Includes all kinds of selfbots: Nitro snipers, selfbots like nighty, auto changing statuses
      
      **9. Profile Picture / Banner Rules**
      ❯ No NSFW allowed
      ❯ No racism
      ❯ No brightly flashing pictures to induce an epileptic attack
      
      **10. Emoji Rules**
      ❯ No NSFW allowed
      ❯ No racism
      ❯ No brightly flashing pictures to induce an epileptic attack
      
      **11. Use English only**
      ❯ We cannot easily moderate chats in different languages, sorry. English only.`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    message.guild.channels.cache
      .find((t) => t.id == args.channel)
      .send(embed)
      .then((message) => {
        message.react("<a:agree:876957443781980222>");
      });
  }
}

module.exports = RulesCommand;
