
const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let license_mask = await db.get(`licensemask_${ctx.message.from.id}`)
    if (license_mask === null) license_mask = "*****-*****-*****-*****-*****"

    let days = args[0];
    let level = args[1];
    let amount = args[2];

    if (!days) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "expiry_is_null"))
    if (!level) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "level_is_null"))
    if (!amount) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "amount_is_null"))

    if (amount > 20) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "amount_is_too_high"))

    let reply = await ctx.reply('Creating licenses...');


    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=add&expiry=${days}&mask=${license_mask}&level=${level}&amount=${amount}&format=json`)
        .then(res => res.json())
        .then(json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                if (json.keys != undefined) {
                    ctx.replyWithHTML(`<b>Licenses have successfully been created!</b>\n\n<b>License Keys:</b>\n${json.keys.join("\n")}`)
                } else {
                    ctx.replyWithHTML(`<b>Licenses have successfully been created!</b>\n\n<b>License Key:</b>\n${json.key}`)
                }
            }
            else {
                ctx.replyWithHTML(`<b>Licenses have failed to be created!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};