const { Connection, Util } = require('stashook-utils');
const Queries = require('../util/message-queries');
const Message = require('../util/message');
const Logger = require('../util/logger');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    service: process.env.EMAIL_SMTP_SERVICE,
    port: process.env.EMAIL_SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL_ID,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
    },

});

module.exports = {
    sendEmail: async (req, res, next) => {

        Connection.query(Queries.MessageTemplate, ['Email', req.body.messageId], function (error, results) {
            
            if (error)
                Util.sendError401(res, Message.UNABLE_TO_SEND_EMAIL);
            if (results && results.length > 0) {

                let options = emailOptions(req.body.email, results[0])

                transporter.sendMail(options, function (error, infoResults) {

                    if (error)
                        Logger.error("Unable To Send Email " + error);
                    else
                        Logger.info("Email Send Successfully.");
                });
            }
        });
    }
}

function emailOptions(email, template) {

    let finalMap = {};
    
    templateMapGenerator(finalMap, email.dataMap, email.keyBaseName); //Construct SingleKey For Nested Object
    renderSubject(finalMap, template); // Render Template Subject with Data
    renderBody(finalMap, template); // Render Template Body Message with Data

    return {
        from: `"${process.env.ADMIN_EMAIL_DISPLAY_NAME}" <${process.env.ADMIN_EMAIL_ID}>`,
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        subject: template.subject,
        html: template.message
    };
}

function renderSubject(finalMap, template) {
    if (finalMap) {
        for (let [key, value] of Object.entries(finalMap)) {
            let source = '{{' + key + '}}';
            value = value ? value : '';
            template.subject = template.subject.replace(source, value);
        }
    }
}

function renderBody(finalMap, template) {

    if (finalMap) {
        for (let [key, value] of Object.entries(finalMap)) {
            let source = '{{' + key + '}}';
            value = value ? value : '';
            template.message = template.message.replace(source, value);
        }
    }
}

function templateMapGenerator(finalMap, dataMap, uKey = '') {
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