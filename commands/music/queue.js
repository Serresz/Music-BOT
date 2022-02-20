const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'queue',
    description: `แสดงคิวเพลง`,
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async(client , interaction , args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
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
            } else {
                const res = queue.songs.map((song, index) => {
                    return [
                        `${index +1} **[${song.name}(${song.url})]** - \`[${song.formattedDuration}]\``
                    ].join(" ")
                }).join("\n")
                const songqueueResult = player.getQueue(interaction.guild.id)
                const embedQUeue = new MessageEmbed()
                .setAuthor({ name: `คิวเพลงบนเซิร์ฟเวอร์`, iconURL: `${client.user.displayAvatarURL()}`, url: `https://discord.com/channels/${interaction.guild.id}`})
                .setColor("#d8ff83")
                .setDescription(`${res.substring(0, 2048)} |\ "ไม่พบเพลงแล้วค่ะ"`)
                .setFooter({ text: `เพลงทั้งหมด : ${songqueueResult.songs.length} เพลง`})
                .setTimestamp()

                interaction.followUp({ embeds: [embedQUeue], content: `คิวเพลงบนเซิร์ฟเวอร์`}).catch(err => console.log(err))
            }
        }
    }
}