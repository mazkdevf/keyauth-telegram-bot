const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username, hwid
    let un = args[0];
    let auxhwid = args[1];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!auxhwid) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "hwid_is_null"))
    
    let reply = await ctx.reply('Adding HWID...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=addhwiduser&user=${un}&hwid=${auxhwid}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>HWID has successfully been added!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>HWID has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};