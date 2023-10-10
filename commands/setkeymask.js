const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');

module.exports = async (ctx, args) => {
    let mask = args[0];

    if (!mask) mask = "*****-*****-*****-*****-*****";

    let reply = await ctx.reply('Setting License Mask...');

    db.fetch(`licensemask_${ctx.message.from.id}`)
    db.set(`licensemask_${ctx.message.from.id}`, license_mask)
    
    ctx.deleteMessage(reply.message_id)

    ctx.replyWithHTML(`<b>License Mask Successfully Set!</b>`);
};