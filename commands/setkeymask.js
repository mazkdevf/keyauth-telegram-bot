const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    // args = mask
    let mask = args[0];

    if (!mask) mask = "*****-*****-*****-*****-*****";

    let reply = await ctx.reply('Setting License Mask...');

    db.fetch(`licensemask_${ctx.message.from.id}`)
    db.set(`licensemask_${ctx.message.from.id}`, license_mask)
    
    ctx.deleteMessage(reply.message_id)

    ctx.replyWithHTML(`<b>License Mask Successfully Set!</b>`);
};