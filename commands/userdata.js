const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets, markdown } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let un = args[0];

    if (!un) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "username_is_null"))

    let reply = await ctx.reply('Fetching user data...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=userdata&user=${un}`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {

                let hwid = json.hwid ?? "N/A";
                let ip = json.ip ?? "N/A";
                let lastlogin = (json.lastlogin !== null && json.lastlogin !== undefined) ? `${json.lastlogin}` : "N/A";
                let expiry = "N/A";
                let subscription = "N/A";
                if (json.subscriptions.length !== 0) {
                    expiry = (json.subscriptions[0].expiry !== null && json.subscriptions[0].expiry !== undefined) ? `${json['subscriptions'][0]['expiry']}` : "N/A";
                    subscription = (json.subscriptions[0].subscription !== null && json.subscriptions[0].subscription !== undefined) ? json.subscriptions[0].subscription : "N/A";
                }


                let userData = `
**User data for ${user}**

**Expiry:** ${expiry}
**Subscription name:** ${subscription}
**Last Login:** ${lastlogin}
**HWID:** ${hwid}
**Created On:** <t:${json['createdate']}:f>
**IP Address:** ${ip}
                        `;

                userData = await markdown(userData);

                ctx.replyWithHTML(userData);
            } else {
                ctx.replyWithHTML(`<b>User data has failed to be fetched!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};