const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username, variablename
    let un = args[0];
    let variablename = args[1];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!variablename) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "variablename_is_null"))

    let reply = await ctx.reply('Deleting User Variable...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=deluservar&user=${un}&var=${variablename}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>User Variable has successfully been deleted!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>User Variable has failed to be deleted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};