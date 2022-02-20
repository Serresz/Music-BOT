const { Client , CommandInteraction, MessageEmbed } = require("discord.js");
const player = require('../../Handler/player');

module.exports = {
    name: 'nowplay',
    description: 'แสดงเพลงที่เล่นอยู่',
    /**
     * @param {Clinet} clinet 
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงค่ะ`).catch(err => console.log(err))
        } else {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
            }
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู๋ค่ะ`).catch(err => console.log(err))
            } else {
                const song = queue.songs[0]
                interaction.followUp({ embeds: [new MessageEmbed().setDescription(`กำลังเล่นเพลง [${song.name}](${song.url}) - ${song.formattedDuration}`)]}).catch(err => console.log(err))
            }
        }
    }
}