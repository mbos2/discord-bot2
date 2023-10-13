import 'dotenv/config'
import type { CommandConfig } from '@roboplay/robo.js'
import dbService from '../../../db/service/index.js';

export const config: CommandConfig = {
  description: 'Sets a channel for audit logs',
  options: [
    {
      name: 'channel',
      required: true,
      description: 'Set a channel where audit logs will be stored'
    }
  ]
}

export default async (event) => {
  const channelId = event.options._hoistedOptions[0].value.match(/\d+/)[0];
  const channelName = event.guild.channels.cache.get(channelId).name;

	try {
    const request = await dbService.setAuditLogChannel({
      channelName: channelName,
      channelId: channelId
    });
    
    if (request.code && request.code === 200) {
      return `Audit log channel set - <#${channelId}>`       
    } 

    return `Audit channel could not be set.`   
	} catch(e) {
    console.log(e)
  }
}