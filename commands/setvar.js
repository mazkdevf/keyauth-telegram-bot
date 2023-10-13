const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let varName = args[0];
    let varValue = args[1];
    let Username = args[2];

    if (!varName) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "var_name_is_null"))
    if (!varValue) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "var_value_is_null"))
    if (!Username) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))

    let reply = await ctx.reply('Setting Variable to User...');


    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=setvar&user=${Username}&var=${varName}&data=${varValue}`)
    .then(res => res.json())
    .then(json => {
        ctx.deleteMessage(reply.message_id)
        if (json.success) {
            ctx.replyWithHTML(`<b>Variable has successfully been set!</b>`);
        } else {
            ctx.replyWithHTML(`<b>Variable has failed to be set!</b>\n\n<b>Reason:</b> ${json.message}`);
        }
    })
};