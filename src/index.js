const { log } = require("console");
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const { config } = require("dotenv");
const { join } = require("path");

config();

const commandsPath = join(__dirname, "..", "commands/");
const listenersPath = join(__dirname, "..", "listeners/");

class Akairo extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: "709202831760162910",
      },
      {
        disableEveryone: true,
      }
    );

    this.commandHandler = new CommandHandler(this, {
      prefix: ["c."],
      blockBots: true,
      blockClient: true,
      allowMention: true,
      defaultCooldown: 800,
      commandUtil: true,
      directory: join(__dirname, "commands"),
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: join(__dirname, "listeners"),
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, "./inhibitors/"),
    });

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    });

    this.inhibitorHandler.loadAll();
    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new Akairo();

client.login("");
