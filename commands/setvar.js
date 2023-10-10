const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    // args = varName, varValue, Username
    let varName = args[0];
    let varValue = args[1];
    let Username = args[2];

    if (!varName) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "varName_is_null"))
    if (!varValue) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "varValue_is_null"))
    if (!Username) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "Username_is_null"))

    let reply = await ctx.reply('Setting Variable to User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=setvar&user=${Username}&var=${varName}&data=${varValue}`)
    .then(res => res.json())
    .then(json => {
        ctx.deleteMessage(reply.message_id)
        if (json.success) {
            ctx.replyWithHTML(`<b>Variable has successfully been set!</b>`);
        } else {
            ctx.replyWithHTML(`<b>Variable has failed to be set!</b>\n\n<b>Reason:</b> ${json.message}`);
        }
    })
};