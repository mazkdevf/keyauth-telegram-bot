const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let name = args[0];

    if (!name) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channel_name_is_null"))

    let reply = await ctx.reply('Deleting Channel...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=delchannel&name=${name}`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>Channel has successfully been deleted!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Channel has failed to be deleted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};