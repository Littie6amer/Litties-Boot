const { Client, Collection, Structures } = require('discord.js')
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_PRESENCES"]
})

const fs = require('fs')
const config = require('./data/config.json')

// Create Listeners
fs.readdirSync('./events').forEach(e => {
    if (!e.endsWith('.js')) return
    client.on(e.slice(0, -3), (a , b) => {
        (require('./events/'+e))(client, a, b)
    })
})

// Load Commands
client.commands = new Collection()
loadFolder('./commands')
function loadFolder (path) {
    fs.readdirSync(path).forEach(c => {
        let path_ = path+'/'+c
        if (!path_.slice(1).includes('.')) {
            loadFolder(path_)
        }
        if (!path_.endsWith('.js')) {} else {
            c = require(path_)
            client.commands.set(c.name, c)
        }
    })
}

// Login to the bot

require('dotenv').config()
client.login(process.env.token)
