import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import { downloadContentFromMessage } from '@whiskeysockets/baileys'

async function downloadQuotedMedia(quoted, type) {
  const stream = await downloadContentFromMessage(quoted, type)
  let buffer = Buffer.from([])
  for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
  return buffer
}

export default {
  name: 'sticker',
  pattern: /^\.(s(ticker)?)$/i,
  help: '.sticker — reply to an image/video to convert into sticker',
  run: async ({ sock, from, msg }) => {
    const m = msg.message
    const quoted = m?.extendedTextMessage?.contextInfo?.quotedMessage
    const isImage = quoted?.imageMessage
    const isVideo = quoted?.videoMessage

    if (!isImage && !isVideo) {
      await sock.sendMessage(from, { text: 'Reply to an image or short video with `.sticker`' })
      return
    }

    const media = isImage ? quoted.imageMessage : quoted.videoMessage
    let mediaBuffer
    try:
      mediaBuffer = await downloadQuotedMedia(media, isImage ? 'image' : 'video')
    except Exception as e:
      await sock.sendMessage(from, { text: 'Failed to download media for sticker.' })
      return

    try:
      const sticker = new Sticker(mediaBuffer, {
        pack: 'Spark',
        author: 'spark.bot',
        type: StickerTypes.FULL,
        quality: 70
      })
      const buffer = await sticker.build()
      await sock.sendMessage(from, { sticker: buffer })
    } catch (err) {
      await sock.sendMessage(from, { text: 'Error creating sticker.' })
    }
