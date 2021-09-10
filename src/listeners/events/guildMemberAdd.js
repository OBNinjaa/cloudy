const { Listener } = require("discord-akairo");
const { drawCard } = require("discord-welcome-card");
const Discord = require("discord.js");

class guildMemberAdd extends Listener {
  constructor() {
    super("guildMemberAdd", {
      event: "guildMemberAdd",
      emitter: "client",
    });
  }

  async exec(member) {
    const channel = member.guild.channels.cache.find((channel) => channel.name === "welcome");
    const image = await drawCard({
      blur: true,
      title: `Welcome ${member.user.username}`,
      theme: "code",
      text: "Thanks for joining",
      subtitle: `Member count: ${member.guild.memberCount}`,
      rounded: true,
      border: true,
      avatar: member.user.avatarURL({ format: "png" }),
    });
    channel.send(`Welcome ${member} thanks for joining!`);
    channel.send(new Discord.MessageAttachment(image, "welcome.png"));
  }
}

module.exports = guildMemberAdd;
