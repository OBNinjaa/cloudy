const { Command } = require("discord-akairo");

class SetupCommand extends Command {
  constructor() {
    super("setup", {
      aliases: ["setup"],
      channel: "guild",
      category: "Utilities",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "Set up logging channels for cloudy.",
      },
      userPermissions: ["MANAGE_CHANNELS"],
      clientPermissions: ["MANAGE_CHANNELS"],
    });
  }

  async exec(message) {
    await message.delete();
    message.guild.channels
      .create("Cloudy Logs", {
        type: "category",
        permissionOverwrites: [
          { id: message.guild.id, deny: ["VIEW_CHANNEL"] },
          { id: message.author.id, allow: ["VIEW_CHANNEL"] },
        ],
      })
      .then((parent) => {
        message.guild.channels
          .create("cloudy-events", {
            type: "text",
            parent,
            permissionOverwrites: [
              { id: message.guild.id, deny: ["VIEW_CHANNEL"] },
              { id: message.author.id, allow: ["VIEW_CHANNEL"] },
            ],
          })
          .catch(console.error);
        message.guild.channels
          .create("mod-logs", {
            type: "text",
            parent,
            permissionOverwrites: [
              { id: message.guild.id, deny: ["VIEW_CHANNEL"] },
              { id: message.author.id, allow: ["VIEW_CHANNEL"] },
            ],
          })
          .catch(console.error);
        message.guild.channels
          .create("staff-room", {
            type: "text",
            parent,
            permissionOverwrites: [
              { id: message.guild.id, deny: ["VIEW_CHANNEL"] },
              { id: message.author.id, allow: ["VIEW_CHANNEL"] },
            ],
          })

          .catch(console.error);
      });
  }
}

module.exports = SetupCommand;
