module.exports = {

    ProducerConfiguration: `SELECT value FROM producersproperty WHERE status = 1 AND producerId = ? AND property = ? `,

}