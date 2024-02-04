const { Client, EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "sabıka-sorgula",
    description: 'İstediğiniz kişinin sabıka kaydına bakarsınız.',
    type: 1,
    options: [
        {
            name: "user",
            description: "Kime bakacaksınız?",
            type: 6,
            required: true
        },

    ],
    run: async (client, interaction) => {
        const user = interaction.options.getMember('user');
        const response = db.get(`cezası.${user.id}`) || [0];
        const yetkili = db.get(`yetkili.${user.id}`) || [0];
        const sebep = db.get(`sebep.${user.id}`) || [0];

        const embed = new EmbedBuilder()
           .setAuthor({name: "SabıkaKaydı", iconURL: user.user.displayAvatarURL({ dynamic: true })})
           .setDescription(`<:cs_moderator:1142129677415223356> **Bilgileri :**\n> <:yeler:1142134346879340554> **Ad :** ${user} - <:ID:1143808005796798524> **ID :** ${user.id}\n\n> <:cs_ban:1142094884216508519> **Toplam Sabıka Kaydı :** ${db.get(`sabıkasayı.${user.id}`)} \n\n <:icons_book:1143615681775013971> **Sabıka Kaydı**\n${response.map(ceza => `> ${ceza} - ${sebep} `).join('\n')}\n**Yetkili :**\n${yetkili.map(yetkili => `> <@${yetkili}>`).join('\n')}`)
           .setThumbnail(user.user.avatarURL())
           .setFooter({text: "Yapımcı : flybuny"})

        interaction.reply({embeds: [embed]})
    }
};