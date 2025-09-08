export const store = {
  linkedAt: null,
  autoJoined: new Set(),
  setLinkedNow() { this.linkedAt = new Date() },
  markAutoJoined(jid) { this.autoJoined.add(jid) },
  hasAutoJoined(jid) { return this.autoJoined.has(jid) }
}
