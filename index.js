require("dotenv").config();
const { Telegraf } = require('telegraf');
const fs = require('fs');

const mazksteleadditionalv1 = new (require("./mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;

const bot = new Telegraf(process.env.TELEGRAMBOT_TOKEN);

process.on('unhandledRejection', async error => {
    console.error(await dataSets(process.env.TG_BOT_LANG, "bot_unhandled_err"), error);
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    const commandName = file.replace('.js', '');
    bot.command(commandName, (ctx) => {
        const args = ctx.message.text.split(' ').slice(1);
        command(ctx, args);
    }).catch(async (err) => {
        console.log(await dataSets(process.env.TG_BOT_LANG, "command_error"), err);
    });
}

bot.on('text', async (ctx) => {
    let symbs = ["!", "&", "$", ".", ",", "?"];

    for (let i = 0; i < symbs.length; i++) {
        if (ctx.message.text.startsWith(symbs[i])) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "unsupported_command"));
    }

    if (ctx.message && ctx.message.text.startsWith('/')) return ctx.reply(await dataSets(process.env.TG_BOT_LANG, "unsupported_command"));
});

async function prepareBot() {
    if (process.env.TG_BOT_LANG != "en") {
        console.log(await dataSets("en", "lang_not_supported"));
        process.exit(0);
    }

    await bot.telegram.getMe().then(async (botInfo) => {
        bot.botInfo = botInfo;
        console.clear();
        console.log(await dataSets(process.env.TG_BOT_LANG, "bot_online"));
        console.log(await dataSets(process.env.TG_BOT_LANG, "logged_in_as"), bot.botInfo.username)
        bot.launch();
    }).catch(async (err) => {
        console.log(await dataSets(process.env.TG_BOT_LANG, "bot_fail_start"), err);
    });
}

prepareBot();