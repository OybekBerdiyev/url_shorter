const { Bot } = require("grammy");
const config = require("../config");
const fetch = require("node-fetch");
const mongoose = require("mongoose"); 

const isChecked = require("./middleware/isAuth")

const bot = new Bot(config.token);

mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


bot.use(isChecked);

bot.command("start", async (ctx) => {
  await ctx.reply("Assalomu alaykum. Men sizga uzun linklarni qisqa qilib beraman. Buning uchun menga uzun link yuboring!");
});

bot.on("message:text", async (ctx) => {
    const url = ctx.message.text;
    if (isValidURL(url)) {
      try {
        const response = await fetch("http://localhost:3234/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });
        if (response.status === 201) {
          const data = await response.json();
          await ctx.reply(`${data.url}`);
          } else {
          await ctx.reply("Nimadur xato ketti shekilli istasangiz bu haqda Adminga xabar bering!\n@doppilikdasturchi");
        }
      } catch (error) {
        console.error("Error in message:text:", error);
        await ctx.reply("Nimadur xato ketti shekilli istasangiz bu haqda Adminga xabar bering!\n@doppilikdasturchi");
      }
    } else {
      await ctx.reply("Iltimos, URL shaklida bo'lgan xabar yuboring.");
    }
  });
  
  
function isValidURL(text) {
  return text.startsWith("http://") || text.startsWith("https://");
}

bot.catch((err) => {
  console.error("Error in bot:", err);
});

bot.start();
