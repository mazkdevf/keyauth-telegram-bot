const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let name = args[0];
    let delay = args[1];

    if (!name) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channel_name_is_null"))
    if (!delay) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "channel_delay_is_null"))
    

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=addchannel&name=${name}&delay=${delay}`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>Channel has successfully been added!</b>`);
            }
            else {
                ctx.replyWithHTML(`<b>Channel has failed to be added!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};