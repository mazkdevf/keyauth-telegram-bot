const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

/*     // args = name
    let name = args[0];

    if (!name) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channel_name_is_null")) */

    let reply = await ctx.reply('Deleting Expired Users...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=delexpusers`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Expired Users have successfully been deleted!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Expired Users have failed to be deleted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};