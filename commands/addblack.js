const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = ip, hwid
    let type = args[0];
    let hardware_or_ip = args[1];

    if (!type) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "type_is_null"))

    if (!hardware_or_ip) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "hardware_or_ip_is_null"))

    let reply = await ctx.reply('Adding Blacklist...');

    let url = type == "hwid" ? `https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=black&hwid=${hardware_or_ip}&format=json` : `https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=black&ip=${hardware_or_ip}&format=json`

    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Blacklist has successfully been added!</b>`);   
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Blacklist has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};