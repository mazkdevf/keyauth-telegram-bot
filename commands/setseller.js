const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = args[0];
    if (!sellerkey) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_null"));

    let reply = await ctx.reply('Setting seller key...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=setseller&format=json`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                db.fetch(`token_${ctx.message.from.id}`)
                db.set(`token_${ctx.message.from.id}`, sellerkey)

                ctx.replyWithHTML(`<b>Seller Key Successfully Set!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Seller Key Set Failed!</b>\n\nYour seller key is most likely invalid.`);
            }
        })
};