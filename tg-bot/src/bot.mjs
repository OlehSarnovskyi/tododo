import TeleBot from "telebot"

const bot = new TeleBot(process.env.BOT_ACCESS_TOKEN)

const WEBAPP_URL = process.env.WEBAPP_URL || "https://tododo-web-app.vercel.app"

// Opens the mini app straight from the message, so a new user never has to
// hunt for the menu button.
const launchButton = JSON.stringify({
  inline_keyboard: [[{ text: "📝 Open my list", web_app: { url: WEBAPP_URL } }]],
})

const WELCOME = `*Welcome to TODODO* 📝

One list per day, right inside Telegram — no install, no signup.

• Tap the circle to move a task: to do → in progress → done
• Drag tasks by the handle to set your priorities
• Didn't get to it? Move it to tomorrow from the ⋮ menu
• Swipe across the date to change days

Your task text is encrypted before it's stored.`

const HELP = `*TODODO help* 📝

• *Add* — tap “+ NEW TASK”
• *Status* — tap the circle: to do → in progress → done
• *Reorder* — drag a task by the handle on the left
• *Tomorrow* — move an unfinished task from the ⋮ menu
• *Days* — swipe the date or tap it to open the calendar

Questions or ideas? Write to @oleh_srn`

bot.on(["/start", "/help"], (msg) => {
  const text = msg.text && msg.text.startsWith("/help") ? HELP : WELCOME

  return bot.sendMessage(msg.chat.id, text, {
    parseMode: "Markdown",
    replyMarkup: launchButton,
  })
})

export default bot
