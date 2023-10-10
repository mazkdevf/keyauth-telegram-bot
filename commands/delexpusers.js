const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let reply = await ctx.reply('Deleting Expired Users...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=delexpusers`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>Expired Users have successfully been deleted!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Expired Users have failed to be deleted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};