const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let un = args[0];
    let sub = args[1];
    let expires = args[2];
    let pass = args[3];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!sub) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sub_name_is_null"))
    if (!expires) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "expires_is_null"))
    if (!pass) pass = "none";
    
    let reply = await ctx.reply('Adding User...');

    let url = pass != "none" ? `https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=adduser&user=${un}&sub=${sub}&expiry=${expires}&pass=${pass}` : `https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=adduser&user=${un}&sub=${sub}&expiry=${expires}`

    fetch(url)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>User has successfully been added!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>User has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};