const mazksteleadditionalv1 = new (require("../mazksteleadditionalv1"))();
const { dataSets, markdown } = mazksteleadditionalv1;
const db = require("quick.db")
module.exports = async (ctx, args) => {
    ctx.replyWithHTML(`<b>Coming Soon!</b>`);
};