const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let key = args[0];

    if (!key) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "licensekey_is_null"));

    let reply = await ctx.reply('Unbanning license...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=unban&key=${key}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>License has successfully been unbanned!</b>`);
            } else {
                ctx.replyWithHTML(`<b>License has failed to be unbanned!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};