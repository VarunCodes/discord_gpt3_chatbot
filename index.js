import 'dotenv/config'
import { Client, GatewayIntentBits } from 'discord.js';
import { OpenAI } from 'openai';

// connect to discord API
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]})

// OpenAI env vars
const openai = new OpenAI({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

// check and reply to discord message
client.on('messageCreate', async function(message){
    console.log(process.env.OPENAI_KEY)
    try {
        if(message.author.bot) return;

        const gptResponse = await openai.completions.create({
            model: "davinci",
            prompt: `ChatGPT is a friendly chatbot who answers concisely and on-topic`,
            temperature: 0.1,
            max_tokens: 100,
            stop: ["ChatGPT"],
        });

        message.reply(`${gptResponse.choices[0].text}`);
        return;
    } catch(err){
        console.log(err);
    }
})

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT Bot is Online on Discord");