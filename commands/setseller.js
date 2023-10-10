const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = args[0];
    if (!sellerkey) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_null"));

    let reply = await ctx.reply('Setting seller key...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=setseller&format=json`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                db.fetch(`token_${ctx.message.from.id}`)
                db.set(`token_${ctx.message.from.id}`, sellerkey)

                ctx.replyWithHTML(`<b>Seller Key Successfully Set!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Seller Key Set Failed!</b>\n\nYour seller key is most likely invalid.`);
            }
        })
};