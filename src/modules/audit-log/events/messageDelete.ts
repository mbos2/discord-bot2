import { Message, AttachmentBuilder } from 'discord.js'
import dbService from '../../../db/service/index.js';
import messageUtil from './utilities/message-template.js';

export default async (message: Message) => {
  const attachmentsArray = [];
  if(message.attachments.size > 0) {
    message.attachments.map(attachment => {
      const att = new AttachmentBuilder(attachment.url)
      attachmentsArray.push(att);
    })  
  } else {
    console.log('No attachments')
  }
  try {
    const auditChannelRequest = await dbService.getAuditLogChannel();
    if (auditChannelRequest && auditChannelRequest.code === 200 && auditChannelRequest.data) {
      const messageTemplate = messageUtil.generateEmbedMessage(message, 'deleted', message.attachments.size);
      const auditChannel = message.guild.channels.cache.get(auditChannelRequest.data.channelId);
 
      if(!auditChannel) {
        console.error(`Channel with id ${auditChannelRequest.data.channelId} not found`);
        return;
      }

      if(auditChannel.isTextBased()) {
        await auditChannel.send({embeds: [messageTemplate], files: attachmentsArray})
      }
    }
  } catch (error) {
    console.log(error)
  }
}
