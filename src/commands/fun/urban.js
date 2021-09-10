const { Command } = require("discord-akairo");
const qs = require("querystring");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

class UrbanCommand extends Command {
  constructor() {
    super("urban", {
      aliases: ["urban"],
      category: "fun",
      description: {
        content: "Looks up slang or cultural words and phrases, not typically found in standard dictionaries.",
        usage: "[word]",
        examples: ["ejit"],
      },
      args: [
        {
          id: "query",
          match: "content",
        },
      ],
    });
  }

  async exec(message, { query }) {
    const search = qs.stringify({ term: query });
    const body = await fetch(`https://api.urbandictionary.com/v0/define?${search}`).then((response) => response.json());
    if (!body.list.length) {
      return message.channel.send(`No results found for **${query}**.`);
    }

    const [answer] = body.list;

    const definition = answer.definition.replace(/\[|\]/g, "");
    const example = answer.example.replace(/\[|\]/g, "");
    const embed = new MessageEmbed()
      .setColor("#ff946e")
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addField("Definition", definition.substring(0, 1024))
      .addField("Example", example.substring(0, 1024))
      .setFooter(`${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎`);

    return message.channel.send(embed);
  }
}

module.exports = UrbanCommand;
