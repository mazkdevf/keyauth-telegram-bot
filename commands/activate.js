const db = require('quick.db');
const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let reply = await ctx.reply('Activating license...');

    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let un = args[0];
    let pw = args[1];
    let key = args[2];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))
    if (!pw) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "password_is_null"))
    if (!key) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "licensekey_is_null"))


    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=activate&user=${un}&key=${key}&pass=${pw}&format=json`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>License Successfully Activated!</b>\n<b>Username:</b> ${un}\n<b>License Activated:</b> ${key}`);
            }
            else {
                ctx.replyWithHTML(`<b>License Activation Failed!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};