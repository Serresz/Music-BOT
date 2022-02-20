const { Client , CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'แสดงคำสั่งทั้งหมด',
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(client, interaction, args) => {
        const help_1 = new MessageEmbed()
        .setColor("#d5ff8f")
        .setAuthor({ name: `\🏠 คำสั่งทั้งหมดของบอท`, iconURL: `${client.user.displayAvatarURL()}`})
        .setDescription(`        
        **เพลง**
        \`play\`, \`skip\`, \`loop\`, \`stop\`
        \`clearmusic\`, \`nowplay\`, \`queue\`, \`volume\`
        \`filter\`, \`seek\`, \`shuffle\`
        
        **ทั่วไป**
        \`ping\`, \`help\``)
        .setImage(`${client.config.helpbanner}`)
        .setFooter({ text: `Prefix : /`, iconURL: `${client.user.displayAvatarURL()}`})
        .setTimestamp()

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("ติดต่อผู้พัฒนา")
            .setStyle("LINK")
            .setURL(`https://discord.com/users/904683149563408435`)
        )
        .addComponents(
            new MessageButton()
            .setLabel("ดิสคอร์ด")
            .setStyle("LINK")
            .setURL("https://discord.gg/vnMRVFE35w")
        )

        await interaction.followUp({ embeds: [help_1], components: [row] }).catch(err => console.log(err))
    }
}