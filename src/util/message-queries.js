module.exports = {

    MessageTemplate: `SELECT message, subject FROM messages WHERE status = 1 AND media = ? AND messageId = ? `,

}