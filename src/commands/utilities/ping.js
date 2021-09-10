const { Command } = require("discord-akairo");

class Ping extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping", "pong"],
      channel: "guild",
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "This provides the ping of the bot.",
      },
    });
  }

  async exec(message) {
    await message.delete();
    const msg = await message.channel.send("Pinging...");

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = ["Boop", "Beep", "O.o"];
    const reponse = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(`${reponse} - **Bot Latency**: \`${latency}ms\`, **API Latency**: \`${Math.round(this.client.ws.ping)}ms\``);
  }
}

module.exports = Ping;
