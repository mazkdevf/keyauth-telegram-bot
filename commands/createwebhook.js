const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = baseurl, useragent, authed
    let baseurl = args[0];
    let useragent = args[1];
    let authed = args[2];

    if (!baseurl) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "baseurl_is_null"))
    if (!useragent) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "useragent_is_null"))
    if (!authed) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "authed_is_null"))
    
if (isNaN(authed)) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "authed_is_not_number"))

// check if baseurl contains http:// or https://
if (!baseurl.includes("http://") && !baseurl.includes("https://")) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "baseurl_is_not_valid"))

    let reply = await ctx.reply('Adding Webhook...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=addwebhook&baseurl=${baseurl}&ua=${useragent}&authed=${authed}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Webhook has successfully been added!</b>`);
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Webhook has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};