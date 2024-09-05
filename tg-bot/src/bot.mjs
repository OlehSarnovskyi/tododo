import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

bot.on('text', msg => {
    return !msg.text.startsWith('/') ? msg.reply.text(msg.text + ' hahaha') : null
})

bot.on('/start', msg => {
    const welcomeMsg = `
    Hello ${msg.from.first_name}!
    I'm Tododo bot. I can launch tododo application.
    `
    return msg.reply.text(welcomeMsg)
})

bot.callbackQuery(callbackQuery => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text;

    if (action === '1') {
        text = 'You hit button 1';
    }

})

bot.sendMessage('Click', {
    reply_markup: {
        inline_keyboard: [
            [
                {
                    text: "Yes",
                    callback_data: "btn_yes"
                },
                {
                    text: "No",
                    callback_data: "btn_no"
                },

            ]
        ],
        keyboard: [
            [
                {
                    text: "keyboard!!!!",
                    callback_data: "123yes"
                },
            ]
        ]
    }
})


// TODO: support different languages (Your language code is ${msg.from.language_code})


export default bot