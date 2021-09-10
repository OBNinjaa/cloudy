const { Listener } = require("discord-akairo");
const chalk = require("chalk");
var figlet = require("figlet");

class Ready extends Listener {
  constructor() {
    super("ready", {
      event: "ready",
      emitter: "client",
    });
  }

  exec() {
    let i = 0;
    setInterval(() => this.client.user.setActivity(`c.help | Powered by Akairo, Developed by OBNinjaa`, { type: "WATCHING" }), 15000);
    console.log();
    console.log(
      chalk.bold.cyanBright(
        figlet.textSync("Cloudy", {
          font: "colossal",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      )
    );
    console.log();
    console.log(chalk.bold.cyanBright(` ${this.client.user.tag} is online!`));
    console.log(chalk.bold.cyanBright(` Developed by OBNinjaa`));
    console.log();
  }
}

module.exports = Ready;
