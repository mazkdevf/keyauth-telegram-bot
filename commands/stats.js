const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { markdown } = mazksteleadditionalv1;
const fetch = require('node-fetch')

module.exports = async (ctx, args) => {
    let reply = await ctx.reply('Fetching Statistics...');

    fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=stats`)
        .then(res => res.json())
        .then(async json => {
            ctx.deleteMessage(reply.message_id)
            if (json.success) {

                let stats = `
**Application Statistics**

**Total Keys:** ${json['totalkeys']}
**Unused Keys:** ${json['unused']}
**Used Keys:** ${json['used']}
**Paused Keys:** ${json['paused']}
**Banned Keys:** ${json['banned']}
**Webhooks:** ${json['webhooks']}
**Files:** ${json['files']}
**Vars:** ${json['vars']}
**Total Accounts:** ${json['totalaccs']}
**Reseller Accounts:** ${json['resellers']}
**Manager Accounts:** ${json['managers']}
    

    `;

                stats = await markdown(stats);

                ctx.replyWithHTML(stats);
            } else {
                ctx.replyWithHTML(`<b>Statistics has failed to be fetched!</b>\n\n<b>Reason:</b> ${json.message}`);
            }
        })
};