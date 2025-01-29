import { oneLine } from 'common-tags'
import { bold, Bot, format } from 'gramio'

import config from '@/config.js'

import { provideLogger } from './utilities/logger.js'

const bot = new Bot(config.botToken)

bot.on('message', async (context) => {
  if (!config.chatIds.includes(context.chat.id)) return
  if (!context.hasReplyMessage() || context.replyMessage.from?.id !== 777000) return

  if (context.hasText() && config.nftLinkRegexps.some((regexp) => regexp.test(context.text))) {
    await context.reply(format`
      🥺 ${bold('Please, do not send NFT links in comments')}
    `).then((message) => {
      setTimeout(() => message.delete().catch(() => {}), 5_000)
    })
      .catch(() => {})

    await context.delete().catch(() => {})
  }
})

bot.onStart(() => {
  provideLogger('bot').info('bot started')
})

const init = async () => {
  provideLogger('index').info(oneLine`
    starting
    ${config.package.name}
    (${config.package.version})
    in ${config.package.mode} mode...
  `)

  await bot.start()
}

init()
