const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let channelName = args[0];
    if (!channelName) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channel_name_is_null"))

    let reply = await ctx.reply('Purging Chat...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=clearchannel&name=${channelName}`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>Chat has successfully been purged!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Chat has failed to be purged!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};