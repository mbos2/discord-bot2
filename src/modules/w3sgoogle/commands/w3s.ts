import { CommandConfig, CommandResult } from '@roboplay/robo.js';
import google from 'googlethis';
import {generateSearchEmbedMessage} from '../utilities/message-template.js';
import type { CommandInteraction } from 'discord.js';

export const config: CommandConfig = {
  description: 'Searches a w3schools website reference',
  options: [
    {
      name: 'request',
      required: true,
      description: 'Search for W3Schools Reference.'
    }
  ]
}

export default async (event: CommandInteraction): Promise<CommandResult> => {
  const options = {
    page: 0, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en',
      num: 5
    }
  }
	const request = event.options.get('request')?.value as string;
  let response = await google.search(`${request} site:w3schools.com`, options);
  if (!response || response.results.length < 1) {
    response = await google.search(`${request} site:developer.mozilla.org`, options);
  }

  const messageTemplate = generateSearchEmbedMessage(response, request);

  return {
		embeds: [ messageTemplate ]
	};
}
