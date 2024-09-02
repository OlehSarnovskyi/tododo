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

// TODO: support different languages (Your language code is ${msg.from.language_code})


export default bot