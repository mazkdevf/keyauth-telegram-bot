const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fetch = require('node-fetch')
const db = require("quick.db")
module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let un = args[0];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))

    let reply = await ctx.reply('Unmuting User...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=unmuteuser&user=${un}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>User has successfully been unmuted!</b>`);
            } else {
                ctx.replyWithHTML(`<b>User has failed to be unmuted!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};