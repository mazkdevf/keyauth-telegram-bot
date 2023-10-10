const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username
    let un = args[0];
    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))

    let reply = await ctx.reply('Fetching License from User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=getkey&user=${un}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>License has successfully been fetched!</b>\n\n<b>License:</b> ${json.key}`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>License has failed to be fetched!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};