import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { getOrCreateSocket, requestPairingFor, tryAutoJoinFor } from './src/index.js'
import { logger } from './src/lib/logger.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.post('/api/pair', async (req, res) => {
  try {
    const { phone } = req.body
    if (!phone || !/^\d{10,15}$/.test(String(phone))) {
      return res.status(400).json({ ok: false, error: 'Provide phone in international digits, e.g., 2348012345678' })
    }

    const sock = await getOrCreateSocket()
    const code = await requestPairingFor(sock, phone)
    return res.json({ ok: true, code })
  } catch (err) {
    logger.error({ err }, 'Pairing error')
    return res.status(500).json({ ok: false, error: err?.message || 'Internal error' })
  }
})

// Optional: endpoint to trigger join manually (for testing)
app.post('/api/trigger-join', async (req, res) => {
  try {
    const { userJid } = req.body
    if (!userJid) return res.status(400).json({ ok:false, error:'provide userJid' })
    const sock = await getOrCreateSocket()
    const result = await tryAutoJoinFor(sock, userJid)
    return res.json({ ok:true, result })
  } catch (err) {
    logger.error({ err }, 'trigger-join error')
    return res.status(500).json({ ok:false, error: err?.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  logger.info(`Spark pairing server on :${PORT}`)
})
