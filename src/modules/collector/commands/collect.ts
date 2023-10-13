import { CommandConfig } from '@roboplay/robo.js';
import { CollectedMessage, CollectedMessageCategory } from '../../../types/types.js';
import dbService from '../../../db/service/index.js';
import { Message } from 'discord.js';

const categoryChoices = [];
for (const [key, value] of Object.entries(CollectedMessageCategory)) {
  categoryChoices.push({
    name: key,
    value: value
  });
}

export const config: CommandConfig = {
  description: 'Collects a message by a message id and stores it in the database',
  options: [
    {
      name: 'id',
      required: true,
      description: 'Message ID'
    },
    {
      name: 'category',
      required: true,
      description: 'Message category',
      choices: categoryChoices
    }
  ]
}

export default async (event) => {
  try {
    const messageId = event.options._hoistedOptions[0].value;
    const messageCategory = event.options._hoistedOptions[1].value;
    const fetchedMessage = await event.member.guild.channels.cache.get(event.channelId).messages.fetch(messageId); 
    // Need to cover embeds too
    const message: CollectedMessage = {
      discordUserId: fetchedMessage.author.id,
      discordUsername: fetchedMessage.author.username,
      discordMessageId: fetchedMessage.id,
      content: fetchedMessage.content,
      embeds: JSON.stringify(fetchedMessage.embeds),
      category: messageCategory,
    }
    const r = await dbService.collectMessage(message);
    console.log(r)
    if(r.code === 200) {
      return { content: 'Message successfully collected', ephemeral: true }
    } else {
      return { content: 'An error occured', ephemeral: true }
    }
  } catch (error) {
    console.log(error)
    return { content: 'An error occured', ephemeral: true }
  }
}