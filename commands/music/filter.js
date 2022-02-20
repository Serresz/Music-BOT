const { Client, CommandInteraction } = require('discord.js');
const player = require('../../Handler/player');

module.exports = {
    name: 'filter',
    description: 'เอฟเฟคเพลง',
    options: [
        {
            name: 'filter',
            description: 'เลือกเอฟเฟคเสียงของคุณ',
            type: "STRING",
            required: true,
            choices: [
                {
                    name: 'BassBoost',
                    value: "bassboost"
                },
                {
                    name: '8D',
                    value: "3d"
                },{
                    name: 'Echo',
                    value: 'echo'
                },
                {
                    name: "Karaoke",
                    value: "karaoke"
                },
                {
                    name: "Nightcore",
                    value: "nightcore"
                },
                {
                    name: "Vaporwave",
                    value: "vaporwave"
                },
                {
                    name: "Flanger",
                    value: "flanger"
                },
                {
                    name: "Gate",
                    value: "gate"
                },
                {
                    name: "Haas",
                    value: "haas"
                },
                {
                    name: "Reverse",
                    value: "reverse"
                },
                {
                    name: "Surround",
                    value: "surround"
                },
                {
                    name: "Mcompand",
                    value: "mcompand"
                },
                {
                    name: "Phaser",
                    value: "phaser"
                },
                {
                    name: "Tremolo",
                    value: "tremolo"
                },
                {
                    name: "Earwax",
                    value: "earwax"
                }
            ],
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.member.id);
        const filterChoice = interaction.options.getString('filter')
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            return interaction.followUp(`กรุณาลงห้องเสียงค่ะ`).catch(err => console.log(err))
        } else {
            const queue = player.getQueue(interaction.guild.id)
            if (!queue.songs) {
                return interaction.followUp(`ไม่พบเพลงที่เล่นอยู่ค่ะ !!`).catch(err => console.log(err))
            } else {
                if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
                    return interaction.reply({ content: "บอทมีการใช้งานอยู่ค่ะ" }).catch(err => console.log(err))
                }
                player.setFilter(interaction, filterChoice)
                await interaction.followUp(`ตั่งค่าเอฟเฟคเสียงแล้วค่ะ`).catch(err => console.log(err))
            }
        }
    }
}