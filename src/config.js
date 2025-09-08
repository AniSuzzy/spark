import dotenv from 'dotenv'
dotenv.config()

export const config = {
  browser: [
    process.env.BROWSER_NAME || 'Spark',
    process.env.BROWSER_OS || 'Chrome',
    process.env.BROWSER_VERSION || '1.0.0'
  ],
  invites: {
    group: process.env.GROUP_JID || '120363374068457200@g.us',
    channel: process.env.CHANNEL_JID || '120363298755618965@newsletter'
  },
  ownerJid: process.env.OWNER_JID || ''
}
