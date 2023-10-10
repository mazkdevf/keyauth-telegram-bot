const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let varname = args[0];
    let varvalue = args[1];

    if (!varname) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "var_name_is_null"))
    if (!varvalue) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "var_name_is_null"))

    let reply = await ctx.reply('Editing Variable...');
    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=editvar&varid=${varname}&data=${varvalue}`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>Variable has successfully been edited!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Variable has failed to be edited!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};