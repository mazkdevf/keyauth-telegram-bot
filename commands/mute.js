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
    let un = args[0];
    let time = args[1];

    let reply = await ctx.reply('Muting User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=muteuser&user=${un}&time=${time}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>User has successfully been muted!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>User has failed to be muted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};