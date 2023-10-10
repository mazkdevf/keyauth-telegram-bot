const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');

module.exports = async (ctx, args) => {
    let webhook = args[0];

    if (!webhook) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "webhook_is_null"))

    let reply = await ctx.reply('Setting Log Webhook...');

    db.fetch(`wh_url_${ctx.message.from.id}`)
    db.set(`wh_url_${ctx.message.from.id}`, license_mask)
    
    ctx.deleteMessage(reply.message_id)

    ctx.replyWithHTML(`<b>Log Webhook Successfully Set!</b>`);  
};