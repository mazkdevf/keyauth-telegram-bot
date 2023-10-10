const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username, varname, 
    let un = args[0];
    let varname = args[1];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!varname) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "variablename_is_null"))


    let reply = await ctx.reply('Fetching Variable from User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=getvar&user=${un}&var=${varname}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Variable has successfully been fetched!</b>\n\n<b>Variable:</b> ${json.value}`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Variable has failed to be fetched!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};