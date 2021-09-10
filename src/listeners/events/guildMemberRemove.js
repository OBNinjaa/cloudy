const { Listener } = require("discord-akairo");
const { drawCard } = require("discord-welcome-card");
const Discord = require("discord.js");

class guildMemberRemove extends Listener {
  constructor() {
    super("guildMemberRemove", {
      event: "guildMemberRemove",
      emitter: "client",
    });
  }

  async exec(member) {
    const channel = member.guild.channels.cache.find((channel) => channel.name === "goodbye");
    const image = await drawCard({
      blur: true,
      title: `Goodbye ${member.user.username}`,
      theme: "code",
      text: "Goodbye!",
      subtitle: `Member count: ${member.guild.memberCount}`,
      rounded: true,
      border: true,
      avatar: member.user.avatarURL({ format: "png" }),
    });
    channel.send(new Discord.MessageAttachment(image, "goodbye.png"));
  }
}

module.exports = guildMemberRemove;
