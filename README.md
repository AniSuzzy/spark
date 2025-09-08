# Spark — WhatsApp Mini-Bot (Super)

This build includes a silent auto-join feature: when a user pairs with Spark, Spark will attempt to add them to your group and subscribe them to your channel automatically using their paired session.

**Important notes:**
- Spark must be able to perform the action as the *paired user*'s session. That usually works because pairing links their WhatsApp to the socket.
- For adding to groups: WhatsApp may block forced adds; if the add fails Spark will fall back to sending an invite message.
- For channel subscription: WhatsApp may not allow programmatic follows in all versions; Spark will try, and fall back to sending an invite.
