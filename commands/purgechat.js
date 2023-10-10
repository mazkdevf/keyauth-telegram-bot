const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = un, time
    let channelName = args[0];
    if (!channelName) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channelName_is_null"))

    let reply = await ctx.reply('Purging Chat...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=clearchannel&name=${channelName}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Chat has successfully been purged!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Chat has failed to be purged!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};