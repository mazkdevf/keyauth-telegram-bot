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

    let reply = await ctx.reply('Unmuting User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=unmuteuser&user=${un}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>User has successfully been unmuted!</b>`);
            } else {
                ctx.replyWithHTML(`<b>User has failed to be unmuted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};