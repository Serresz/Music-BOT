const { Client, CommandInteraction } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'skip',
    description: 'ข้ามเพลง',
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction
     * @param {String[]} args 
     */
    run: async(client , interaction , args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voicechannel = member.voice.channel;
        if (!voicechannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงก่อนใช้คำสั่งค่ะ`).catch(err => console.log(err))
        } else {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
            }
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ`).catch(err => console.log(err))
            } else if (queue.songs.length === 1) {
                queue.stop()
                interaction.followUp(`ข้ามเพลงแล้วค่ะ`).catch(err => console.log(err))
            } else {
                await queue.skip()
                interaction.followUp(`ข้ามเพลแงแล้วค่ะ`).catch(err => console.log(err))
            }
        }
    }
}