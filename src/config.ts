import { existsSync } from 'fs'
import { loadEnvFile } from 'process'

import env from 'env-var'

if (existsSync('.env') || (process.env.NODE_ENV === 'development' && existsSync('.env.development'))) {
  loadEnvFile((process.env.NODE_ENV === 'development' && existsSync('.env.development')) ? '.env.development' : '.env')
}

export default {
  package: {
    name: env.get('npm_package_name').default('unknown').asString(),
    version: env.get('npm_package_version').default('unknown').asString(),
    mode: env.get('NODE_ENV').default('production').asString(),
  },
  chatIds: env.get('CHAT_IDS').default('').asString().split(',').map((id) => parseInt(id)),
  botToken: env.get('BOT_TOKEN').required().asString(),
  nftLinkRegexps: env.get('NFT_LINK_REGEXPS').default('').asString().split(';').map((regexp) => new RegExp(regexp)),
}
