const { markup } = require("telegraf")
const mazks = require("../mazks")
const { clearSpaces, markdown, dataSets } = new mazks()
const { message, data } = require('telegraf/filters')
const db = require('quick.db');

const fetch = require('node-fetch')

module.exports = async (ctx, args) => {


    let sellerkey = await db.get(`token_${ctx.message.from.id}`)
    if (sellerkey === null) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "sellerkey_is_not_set"));

    // args = type (licenses, users, subs, chats, sessions, files, vars, blacklists, webhooks, buttons)
    let type = args[0];

    if (!type) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "type_is_null"))

    let reply = null;
    switch (type) {
        case "licenses":

            reply = await ctx.reply('Fetching Licenses...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallkeys&format=json`)
                .then(res => res.json())
                .then(res => {
                    ctx.deleteMessage(reply.message_id)
                    if (res.success) {
                        ctx.replyWithHTML(`<b>Successfully Fetched Licenses!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(JSON.stringify(res.keys, null, 4)), filename: 'keylist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Licenses!</b>\n\n<b>Reason:</b> ${res.message}`);
                    }
                })
            break;
        case "users":

            reply = await ctx.reply('Fetching Users...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallusers`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var users = "";
                        for (var i = 0; i < json.users.length; i++) {
                            users += json.users[i].username + "\n";
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Users!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(users), filename: 'userlist.txt' })

                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Users!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })

            break;
        case "subs":
            reply = await ctx.reply('Fetching Subscriptions...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallsubs`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var subs = "";
                        for (var i = 0; i < json.subs.length; i++) {
                            subs += `Subscription: ${json.subs[i].name} - Level: ${json.subs[i].level}\n`;
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Subscriptions!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(subs), filename: 'subscriptionlist.txt' })
                    } else {
                        cfx.replyWithHTML(`<b>Failed to Fetch Subscriptions!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })

            break;
        case "chats":
            reply = await ctx.reply('Fetching Chats...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallchats`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var chats = "";
                        for (var i = 0; i < json.chats.length; i++) {
                            chats += `Name: ${json.chats[i].name} - Delay: ${json.chats[i].delay}\n`;
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Chats!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(chats), filename: 'chatlist.txt' })


                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Chats!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })

            break;
        case "sessions":
            reply = await ctx.reply('Fetching Sessions...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallsessions`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var sessions = "";
                        for (var i = 0; i < json.sessions.length; i++) {
                            sessions += `ID: ${json.sessions[i].id} - Validated: ${json.sessions[i].validated ? true : false}` + "\n";
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Sessions!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(sessions), filename: 'sessionlist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Sessions!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })

            break;
        case "files":
            reply = await ctx.reply('Fetching Files...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallfiles`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var files = "";
                        for (var i = 0; i < json.files.length; i++) {
                            files += `ID: ${json.files[i].id} - Download: ${json.files[i].url}` + "\n";
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Files!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(files), filename: 'filelist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Files!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })

            break;
        case "vars":
            reply = await ctx.reply('Fetching Variables...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallvars`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var vars = "";
                        for (var i = 0; i < json.vars.length; i++) {
                            vars += `ID: ${json.vars[i].varid} - Data: ${json.vars[i].msg}` + "\n";
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Variables!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(vars), filename: 'varlist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Variables!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })
            break;
        case "blacklists":
            reply = await ctx.reply('Fetching Blacklists...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallblacks`)
                .then(res => res.json())
                .then(json => {
                    ctx.deleteMessage(reply.message_id)
                    if (json.success) {

                        var blacklists = "";
                        for (var i = 0; i < json.blacklists.length; i++) {

                            let btemp = "";
                            if (json.blacklists[i].ip !== null)
                                btemp = `${json.blacklists[i].ip}`;
                            else
                                btemp = `${json.blacklists[i].hwid}`;

                            blacklists += `**ID: ${i} - Type: ${json.blacklists[i].type}** ${btemp}` + "\n";
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Blacklists!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(blacklists), filename: 'blacklistlist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Blacklists!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })
            break;
        case "webhooks":
            reply = await ctx.reply('Fetching Webhooks...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallwebhooks`)
                .then(res => res.json())
                .then(json => {
                    cfx.deleteMessage(reply.message_id)
                    if (json.success) {
                        var webhooks = "";
                        for (var i = 0; i < json.webhooks.length; i++) {
                            let authed = (json.webhooks[i].authed == "1") ? "True" : "False";
                            webhooks += `Web ID: ${json.webhooks[i].webid} - Base link: ${json.webhooks[i].short_baselink} - Useragent: ${json.webhooks[i].useragent} - Authed: ${authed}\n`
                        }

                        ctx.replyWithHTML(`<b>Successfully Fetched Webhooks!</b>`);
                        ctx.replyWithDocument({ source: Buffer.from(webhooks), filename: 'webhooklist.txt' })
                    } else {
                        ctx.replyWithHTML(`<b>Failed to Fetch Webhooks!</b>\n\n<b>Reason:</b> ${json.message}`);
                    }
                })
            break;
        case "buttons":
            reply = await ctx.reply('Fetching Buttons...');

            fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=fetchallbuttons`)
            .then(res => res.json())
            .then(json => {
                cfx.deleteMessage(reply.message_id)
                if (json.success) {

                    var buttons = "";
                    for (var i = 0; i < json.buttons.length; i++) {
                        buttons += `Text: ${json.buttons[i].text} - Value: ${json.buttons[i].value}`
                    }
                    
                    ctx.replyWithHTML(`<b>Successfully Fetched Buttons!</b>`);
                    ctx.replyWithDocument({ source: Buffer.from(buttons), filename: 'buttonlist.txt' })                   
                } else {
                    ctx.replyWithHTML(`<b>Failed to Fetch Buttons!</b>\n\n<b>Reason:</b> ${json.message}`);
                }
            })
            break;
        default:
            return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "type_is_invalid"))
    }

    /*  fetch(`https://keyauth.win/api/seller/?sellerkey=${sellerkey}&type=extend&user=${un}&sub=${subname}&expiry=${days}`)
         .then(res => res.json())
         .then(json => {
             if (json.success) {
                 ctx.deleteMessage(reply.message_id)
                 ctx.replyWithHTML(`<b>Subscription has successfully been edited!</b>`);
             }
             else {
                 ctx.deleteMessage(reply.message_id)
                 ctx.replyWithHTML(`<b>Subscription has failed to be edited!</b>\n\n<b>Reason:</b> ${json.message}`);
             }
         }) */
};