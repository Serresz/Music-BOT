const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { formatDuration } = require("distube");
const player = require("../../Handler/player");

module.exports = {
    name: "play",
    description: "เปิดเพลง",
    options: [
        {
            name: 'search',
            description: 'ค้นหาเพลง',
            type: "STRING",
            required: true,
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id)
        const voicechannel = member.voice.channel;
        if (!voicechannel) {
            return interaction.fetchReply(`กรุณาเข้าห้องเสียงก่อนใช้งานคำสั่งค่ะ !!`).catch(err => console.log(err))
        }

        if (formatDuration > 2400000) {
            return;
        } else {
            await interaction.followUp({ embeds: [new MessageEmbed().setDescription(`กำลังเล่นเพลงค่ะ`).setColor("#4741ff")] }).catch(err => console.log(err))
            const search = interaction.options.getString('search')
            player.play(voicechannel, search, {
                member: member,
                textChannel: interaction.channel
            }).catch(err => console.log(err))
        }
    }
};
