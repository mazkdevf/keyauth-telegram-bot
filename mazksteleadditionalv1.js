class mazksteleadditionalv1 {
    constructor() {}

    dataSets = (lang = "en", needed) => new Promise(async (resolve) => {
        let json = null;
        if (lang == "en") {
            json = await require("./texts.json");
        }

        return resolve(json[needed] ?? `DATASETS: Text not found for ${needed}`);
    });

    markdown = (text) => new Promise((resolve) => {
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
        return resolve(text);
    });
}

module.exports = mazksteleadditionalv1;