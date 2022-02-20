const { Client , CommandInteraction } = require("discord.js");
const player = require('../../Handler/player');

module.exports = {
    name: 'stop',
    description: 'หยุดเพลง',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {Strng[]} args
     */
    run: async(client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาเข้าร่วมห้องเสียงค่ะ`).catch(err => console.log(err))
        } else {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
            }
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ`).catch(err => console.log(err))
            } else {
                await queue.stop()
                interaction.followUp(`หยุดเพลงแล้วค่ะ`).catch(err => console.log(err))
            }
        }
    }
}
