const { Client, CommandInteraction } = require('discord.js')
const player = require('./../../Handler/player');

module.exports = {
    name: 'seek',
    description: 'ปรับเวลาเพลง',
    options: [
        {
            name: 'time',
            description: 'กรุณากรอกเวลาค่ะ',
            type: "NUMBER",
            required: true
        }
    ],
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const amountSeek = interaction.options.getNumber('time')
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงค่ะ`).catch(err => console.log(err))
        } else {
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ`).catch(err => console.log(err))
            } else if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.followUp(`บอทกำลังเล่นเพลงอยู่ค่ะ`).catch(err => console.log(err))
            } else {
                if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                    return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
                }
                const time = parseInt(amountSeek)
                if (!time) {
                    return interaction.followUp(`กรุณากำหนดเป็นวินาทีค่ะ`).catch(err => console.log(err))
                } else {
                    if (time >= queue.songs[0].duration) {
                        return interaction.followUp(`เวลา : \`${queue.songs[0].duration} วินาที`).catch(err => console.log(err))
                    } else {
                        player.seek(interaction, Number(amountSeek))
                        await interaction.followUp(`ข้ามเวลาไปที่ : \`${amountSeek}\` วินาที`).catch(err => console.log(err))
                    }
                }
            }
        }
    }
}