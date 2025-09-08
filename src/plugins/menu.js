const lines = [
  '⚡ *Spark* — Commands',
  '• `.ping` — check status',
  '• `.sticker` (reply to image/video) — make sticker',
]

export default {
  name: 'menu',
  pattern: /^\.(menu|help)$/i,
  help: '.menu — show commands',
  run: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: lines.join('\n') })
  }
}
