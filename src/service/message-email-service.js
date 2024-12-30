const { Connection, Util } = require('stashook-utils');
const Queries = require('../util/message-queries');
const Message = require('../util/message');
const Logger = require('../util/logger');
const nodemailer = require('nodemailer');
const Formatter = require('./message-data-formatter');

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
                        Logger.error("Unable To Send Email " + error + ":: " + JSON.stringify(req.body.email));
                    else
                        Logger.info("Email Send Successfully.");
                });
            }
        });
    }
}

function emailOptions(email, template) {

    let finalMap = {};
    
    Formatter.templateMapGenerator(finalMap, email.dataMap, email.keyBaseName); //Construct SingleKey For Nested Object
    Formatter.renderSubject(finalMap, template); // Render Template Subject with Data
    Formatter.renderBody(finalMap, template); // Render Template Body Message with Data

    return {
        from: `"${process.env.ADMIN_EMAIL_DISPLAY_NAME}" <${process.env.ADMIN_EMAIL_ID}>`,
        to: email.to,
        cc: email.cc,
        bcc: email.bcc,
        subject: template.subject,
        html: template.message
    };
}
