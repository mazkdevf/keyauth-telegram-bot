const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    // args = un
    let un = args[0];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))

    let reply = await ctx.reply('Verifying User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=verifyuser&user=${user}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>User has successfully been verified, and it exists!</b>`);
            } else {
                ctx.replyWithHTML(`<b>User has failed to be verified!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};