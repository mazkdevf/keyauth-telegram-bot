const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets, markdown } = mazksteleadditionalv1;
const db = require('quick.db');
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    let key = args[0];

    if (!key) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "licensekey_is_null"))

    let reply = await ctx.reply('Getting License Information...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=info&key=${key}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {
                if (json.hwid == null) { json.hwid == null } else { }
                if (json.ip == null) { json.ip == null } else { }

                let message = `
**Key Information for ${key}**
    
**Expiry:** ${json['expiry']}
**Last Login:** ${json['lastlogin']}
**HWID:** ${hwid}
**Status:** ${json['status']}
**Level:** ${json['level']}
**Created By:** ${json['createdby']}
**Created On:** ${json['creationdate']}
**IP Address:** ${ip}
    `;


                message = await markdown(message);

                ctx.replyWithHTML(message);

            } else {
                ctx.replyWithHTML(`<b>License Information has failed to be fetched!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};