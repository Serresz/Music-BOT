const { Clinet, CommandInteraction } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'shuffle',
    description: 'สลับคิวเพลง',
    /**
     * @param {Client} Client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id)
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงก่อนค่ะ`).catch(err => console.log(err))
        } else {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
            }
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ`).catch(err => console.log(err))
            } else if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.followUp(`บอทมีผู้ใช้งานอยู่ค่ะ`)
            } else {
                await player.shuffle(interaction)
                await interaction.followUp(`สลับคิวเพลงแล้วค่ะ`)
            }
        }
    }
}