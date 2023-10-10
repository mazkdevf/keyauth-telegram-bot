const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    // args = webhook
    let webhook = args[0];

    if (!webhook) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "webhook_is_null"))

    let reply = await ctx.reply('Setting Log Webhook...');

    db.fetch(`wh_url_${ctx.message.from.id}`)
    db.set(`wh_url_${ctx.message.from.id}`, license_mask)
    
    ctx.deleteMessage(reply.message_id)

    ctx.replyWithHTML(`<b>Log Webhook Successfully Set!</b>`);  
};