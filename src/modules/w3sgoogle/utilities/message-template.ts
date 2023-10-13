import { EmbedBuilder } from "discord.js";

export function generateSearchEmbedMessage (response, searchQuery) {

  const embed = new EmbedBuilder()
  .setColor(0x0099ff)
  .setTitle(`Search Results`);

  embed.addFields({
    name: `Search query: `,
    value: `${searchQuery}`
  })

  if (response && response.results.length > 0) {
    for (let i = 0; i < response.results.length; i++) {
      const r = response.results[i];
      embed.addFields({
        name: `${r.url}`,
        value: `${r.description})`
      })
    }
  } else {
    embed.addFields({
      name: `Whoops! :(`,
      value: `No results found . . . `
    })
  }

  embed.setTimestamp();
  return embed;
}