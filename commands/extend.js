const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username, subname, expiry
    let un = args[0];
    let subname = args[1];
    let days = args[2];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!subname) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "subname_is_null"))
    if (!days) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "expiry_is_null"))

    let reply = await ctx.reply('Editing Subscription...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=extend&user=${un}&sub=${subname}&expiry=${days}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Subscription has successfully been edited!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Subscription has failed to be edited!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};