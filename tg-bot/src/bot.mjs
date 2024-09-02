import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

bot.on('text', msg => msg.reply.text(msg.text + 'hahaha'))

bot.on('/start', msg => {
    const username = `${msg.from.first_name} ${msg.from.last_name} ${msg.from.username} ${msg.from.title}`
    const welcomeMsg = `
    Hello ${username}!
    I'm Tododo bot. I can launch tododo application.
    Your language code is ${msg.from.language_code}
    `
    msg.reply.text(welcomeMsg)
})

export default bot