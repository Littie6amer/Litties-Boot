const process_settings = require("../process-settings");

module.exports = async (client) => {
    // client.invites.bugReport = (await client.guilds.cache.get("882345419852632114").invites.fetch({ code: "adYXN5pa8X" })).uses
    client.membercount = 0;
    client.guilds.cache.forEach(g => {
        client.membercount += g.memberCount
    });
    setInterval(() => {
        client.membercount = 0;
        client.guilds.cache.forEach(g => {
            client.membercount += g.memberCount
        });
    }, 30000)
    let guildcount = client.guilds.cache.size
    console.log(`${Math.floor(process.uptime()*1000)} [${client.user.username}]: Ready!`)
    console.log(`${Math.floor(process.uptime()*1000)} [${client.user.username}]: ${guildcount} Guild(s) with ${client.membercount} Member(s)`)
    console.log('~~~')
    if (client.dbState == "connected") client.user.setPresence({ activities: [{ name: `${process_settings.defaultPrefixes[0]}help | ${process_settings.name}` }], status: 'online' })
    else client.user.setPresence({ activities: [{ name: `Just restarted! Waiting for database...` }], status: 'idle' })
}