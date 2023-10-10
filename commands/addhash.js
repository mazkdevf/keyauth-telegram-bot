const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = name, delay
    let md5hash = args[0];
    if (!md5hash) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "hash_is_null"))
    
    let reply = await ctx.reply('Adding MD5 Hash...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=addhash&hash=${md5hash}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Hash has successfully been added!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Hash has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};