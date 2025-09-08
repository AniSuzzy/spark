export default {
  name: 'ping',
  pattern: /^\.(ping|alive)$/i,
  help: '.ping — check if Spark is alive',
  run: async ({ sock, from }) => {
    await sock.sendMessage(from, { text: 'Pong! ⚡' })
  }
}
