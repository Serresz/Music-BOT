const { Client , CommandInteraction } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'volume',
    description: 'ปรับระดับเสียงเพลง',
    options: [
        {
           name: 'vol',
           description: 'ระดับเสียงเพลง 1 - 150',
           type: "NUMBER",
           required: true 
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(clinet, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงค่ะ`).catch(errr => console.log(err))
        } else {
            if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
            }
            const queue = player.getQueue(interaction.guild.id);
            const volume = interaction.options.getNumber('vol')
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู๋ค่ะ`).catch(err => console.log(err))
            } else if (volume > 150) {
                return interaction.followUp(`ปรับระดับเสียงได้ไม่เกิน \`150\` นะ`).catch(err => console.log(err))
            } else if (volume < 1) {
                return interaction.followUp(`ปรับระดับเสียงได้หามน้อยกว่า \`1\``).catch(err => console.log(err))
            } else {
                await queue.setVolume(Number(volume))
                interaction.followUp(`ปรับระดับเสียงเพลงเป็น \`${volume}\` %`).catch(err => console.log(err))
            }
        }
    }
}