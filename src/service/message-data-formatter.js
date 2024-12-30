const NodeCache = require("node-cache");
const mediaConfigCache = new NodeCache();
const Queries = require('../util/configuration-queries.js');
const { Connection } = require('stashook-utils');

module.exports = {

    getMediaConfiguration: async (req) => {

        let config_value = mediaConfigCache.get(req.body.config.key);

        if (config_value) {
            req.body.config.value = config_value;
        }
        else {

            Connection.query(Queries.ProducerConfiguration, [req.sessionUser.producerId, req.body.config.property], function (error, results) {

                if (error)
                    req.body.config.value = undefined;
                else if (results && results.length > 0) {
                    config_value = JSON.parse(results[0].value);
                    mediaConfigCache.set(req.body.config.key, config_value);
                    req.body.config.value = config_value;
                }
            });
        }

    },

    renderSubject: async (finalMap, template) => {
        if (finalMap) {
            for (let [key, value] of Object.entries(finalMap)) {
                let source = '{{' + key + '}}';
                value = value ? value : '';
                template.subject = template.subject.replace(source, value);
            }
        }
    },

    renderBody: async (finalMap, template) => {

        if (finalMap) {
            for (let [key, value] of Object.entries(finalMap)) {
                let source = '{{' + key + '}}';
                value = value ? value : '';
                template.message = template.message.replace(source, value);
            }
        }
    },

    templateMapGenerator: async (finalMap, dataMap, uKey = '') => {
        let pKey = uKey;
        if (dataMap) {
            for (let [key, value] of Object.entries(dataMap)) {
                pKey = (pKey == '') ? key : pKey + '.' + key;

                if (value instanceof Object && !Array.isArray(value)) {
                    templateMapGenerator(value, finalMap, pKey);
                }
                else {
                    finalMap[pKey] = value;
                    pKey = uKey;
                }
            }
        }
    }
}