const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    // args = key
    let key = args[0];

    if (!key) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "key_is_null"))

    let reply = await ctx.reply('Unbanning license...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=unban&key=${key}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>License has successfully been unbanned!</b>`);
            } else {
                ctx.replyWithHTML(`<b>License has failed to be unbanned!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};