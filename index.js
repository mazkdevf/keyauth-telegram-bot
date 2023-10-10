require("dotenv").config();
const { Telegraf } = require('telegraf');
const fs = require('fs');


const mazks = require("./mazks")
const { clearSpaces, markdown, dataSets, dataSetsNoAwait } = new mazks()

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

bot.on('text', (ctx) => {
    let symbs = ["!", "&", "$", ".", ",", "?"];

    for (let i = 0; i < symbs.length; i++) {
        if (ctx.message.text.startsWith(symbs[i])) return ctx.reply('Hello, Unsupported command type. Type / to see available commands.');
    }

    if (ctx.message && ctx.message.text.startsWith('/')) return ctx.reply('Hello, Unsupported command type. Type /help to see available commands.');
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