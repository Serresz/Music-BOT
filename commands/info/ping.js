const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "ความหน่วงของบอท",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        interaction.followUp({ content: `${client.ws.ping}ms!` }).catch(err => console.log(err));
    },
};
