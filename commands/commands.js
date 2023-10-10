const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets } = mazksteleadditionalv1;
const fs = require('fs');
module.exports = async (ctx) => {
    ctx.reply("Command are disabled for now.")
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js') && file !== 'commands.js');

    let commands = [];
    for (const file of commandFiles) {
        const commandName = file.replace('.js', '');

        commands.push({
            name: commandName,
            command: "/" + commandName + " - " +  await dataSets(process.env.TG_BOT_LANG, commandName + "_args"),
            description: await dataSets(process.env.TG_BOT_LANG, commandName)
        });
    }


    let commandsString = "";
    commands.forEach(command => {
        commandsString += `<b>${command.command}</b> - ${command.description}\n`;
    });

    ctx.replyWithHTML(`<b>Available commands:</b>\n\n${commandsString}`);
};
