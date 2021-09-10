const { Listener } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = class GuildBanRemoveListener extends Listener {
  constructor() {
    super("guildBanRemove", {
      emitter: "client",
      event: "guildBanRemove",
    });
  }

  async exec(guild, user) {
    let logs = guild.channels.cache.find((channel) => channel.name === "logs");
    const embed = new MessageEmbed();
    {
      embed;
      embed.setTitle(`__**${user}** Unbanned**__`);
      embed.setThumbnail(user.displayAvatarURL());
      embed.setDescription(stripIndents`The user **${user}** was unbanned from the guild.`);
      embed.setColor("#ff946e");
      embed.setTimestamp();
      embed.setFooter(this.client.user.username, this.client.user.displayAvatarURL());
    }
    return logs.send({ embed });
  }
};
