const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let key = args[0];

    if (!key) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "licensekey_is_null"))

    let reply = await ctx.reply('Verifying License...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=verify&key=${key}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                ctx.replyWithHTML(`<b>License has successfully been verified!</b>`);
            } else {
                ctx.replyWithHTML(`<b>License has failed to be verified!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};