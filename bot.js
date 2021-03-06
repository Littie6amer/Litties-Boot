// require('dotenv').config()
const fs = require('fs')
const { Client } = require('discord.js')
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"],
})
const process_settings = require("./process-settings")

// Connect to the database

const mongoose = require('mongoose')

// Load commands

const loader = require('./loader')
Object.assign(client, loader, { cooldowns: {} })

// Create Listeners

fs.readdirSync('./events').forEach(e => {
    if (!e.endsWith('.js')) return
    client.on(e.slice(0, -3), (a, b) => {
        (require('./events/' + e))(client, a, b).catch(e => {
            console.log(`[Boot Manager Error]: Code error with the ${e} listener`)
            console.log(`~~~`)
            return console.error(e);
        })
    })
})

// Login to the bot
client.login(process_settings.botToken)

client.dbState = "disconnected"
dbConnect()
function dbConnect() {
    mongoose.connect(process_settings.dbUrl, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, async (err, mongo) => {
        if (err) {
            client.dbState = "disconnected"
            console.log(err)
            console.log(`${Math.floor(process.uptime() * 1000)} [Mongoose]: Failed to connect! Retrying in 30 seconds.`);
            await sleep(30000)
            return dbConnect();
        }
        client.dbState = "connected"
        console.log(`${Math.floor(process.uptime() * 1000)} [Mongoose]: Connected!`)
        if (client.user) client.user.setPresence({ activities: [{ name: `${process_settings.defaultPrefixes[0]}help | ${process_settings.name}` }], status: 'online' });
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}