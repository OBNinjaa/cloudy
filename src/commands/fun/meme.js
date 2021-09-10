const { stripIndents } = require("common-tags");
const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const got = require("got");

class MemeCommand extends Command {
  constructor() {
    super("meme", {
      aliases: ["meme", "m"],
      category: "Fun",
      channel: "guild",
      cooldown: 6000,
      ratelimit: 3,
      description: {
        content: "Displays a randomly generated meme.",
      },
    });
  }

  exec(message) {
    got("https://www.reddit.com/r/dankmemes/random/.json").then((response) => {
      let content = JSON.parse(response.body);
      let permalink = content[0].data.children[0].data.permalink;
      let memeUrl = `https://reddit.com${permalink}`;
      let memeImage = content[0].data.children[0].data.url;
      let memeTitle = content[0].data.children[0].data.title;
      let memeUpvotes = content[0].data.children[0].data.ups;
      let memeDownvotes = content[0].data.children[0].data.downs;
      let memeNumComments = content[0].data.children[0].data.num_comments;
      const embed = new MessageEmbed();
      {
        embed;
        embed.setTitle(`${memeTitle}`);
        embed.setURL(`${memeUrl}`);
        embed.setImage(memeImage);
        embed.setColor("#ff946e");
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
      }

      return message.util.send(embed);
    });
  }
}

module.exports = MemeCommand;
