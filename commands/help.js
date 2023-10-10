const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown } = new mazks()
const { message } = require('telegraf/filters')
module.exports = async (ctx, args) => {

    let helpMessage = `
**KeyAuth Help menu**
    
This bot is for the open-source authentication system [KeyAuth](https://keyauth.cc)\n\nIf you're using the cloud hosted version of KeyAuth, you'll need the seller plan to use. \n\nYou can test before purchase by using the demo seller account that can be found in [KeyAuth Free Trial](https://keyauth.cc/free-trial/)


Library: KeyAuth Tele V1.0.0
Tutorial Video: [Watch Tutorial](https://www.youtube.com/watch?v=orQ_5BQCd-U)
    `;
    
    helpMessage = await markdown(helpMessage);

    ctx.replyWithHTML(helpMessage, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "KeyAuth Website", url: "https://keyauth.com" }],
                [{ text: "KeyAuth Free Trial", url: "https://keyauth.com" }],
            ]
        }
    })
};
