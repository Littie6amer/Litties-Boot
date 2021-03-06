const utils = require('../../utils')
const Command = utils.Command

const command = module.exports = new Command()

command
    .create(["bypass", "by"], "Bypass cooldowns (meant for devs)")
    .restrict()
    .setExecute(execute)

async function execute(toolbox) {
    const { userGuildProfile, message } = toolbox
    userGuildProfile.bypass = userGuildProfile.bypass ? false : true
    userGuildProfile.save()
    if (message.reactable) toolbox.message.react(userGuildProfile.bypass ? "<:enable:868669549371871322>" : "<:disabled:868669549376045088>")
    else message.reply(userGuildProfile.bypass ? "<:enable:868669549371871322>" : "<:disabled:868669549376045088>")
}