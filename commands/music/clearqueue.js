const { Client, CommandInteraction } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'clearmusic',
    description: 'ล้างเพลงทั้งหมด',
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงค่ะ`).catch(err => console.log(err))
        } else if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
        }
        const queue = player.getQueue(interaction.guild.id)
        if (!queue.songs) {
            return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ`).catch(err => console.log(err))
        } else {
            await queue.delete()
            interaction.followUp(`ล้างเพลงทั้งหมดออกจากคิวเพลงแล้วค่ะ`).catch(err => console.log(err))
        }
    }
}