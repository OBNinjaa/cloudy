const { Inhibitor } = require("discord-akairo");

class BlacklistInhibitor extends Inhibitor {
  constructor() {
    super("blacklist", {
      reason: "blacklist",
    });
  }

  async exec(message) {
    if (message.channel.type === "dm") return;
    const blacklist = ["672131729817075733", "600421682586320916"];
    if (blacklist.includes(message.author.id)) return message.author.send("You are blacklisted!");
    return blacklist.includes(message.author.id);
  }
}

module.exports = BlacklistInhibitor;
