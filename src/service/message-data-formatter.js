module.exports = {
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