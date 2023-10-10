const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = username, days, weeks, months, threemonths, sixmonths, lifetimes
    let username = args[0];
    let days = args[1];
    let weeks = args[2];
    let months = args[3];
    let threemonths = args[4];
    let sixmonths = args[5];
    let lifetimes = args[6];

    if (!username) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!days) days = 0
    if (!weeks) weeks = 0
    if (!months) months = 0
    if (!threemonths) threemonths = 0
    if (!sixmonths) sixmonths = 0
    if (!lifetimes) lifetimes = 0

    let reply = await ctx.reply('Adding Balance to User...');


    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=setbalance&username=${username}&day=${days}&week=${weeks}&month=${months}&threemonth=${threemonths}&sixmonth=${sixmonths}&lifetime=${lifetimes}`)
        .then(res => res.json())
        .then(json => {
            if (json.success) {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Balance has successfully been added to ${username}!</b>`);
                
            }
            else {
                ctx.deleteMessage(reply.message_id)
                ctx.replyWithHTML(`<b>Balance has failed to be added to ${username}!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};