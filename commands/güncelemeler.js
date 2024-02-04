const db = require("croxydb");
const { EmbedBuilder, IntegrationApplication } = require("discord.js");
module.exports = {
  name: "güncellemeler",
  description: "Botun güncellemeleri hakkında bilgi alırsınız.",
  type: 1,

  run: async (client, interaction) => {


const warn = new EmbedBuilder()
.setAuthor({name: `Güncelemeller! - V0.0.1`})
.setDescription('> Herhangi bir güncelleme yok.')
.setColor("Green")
.setFooter({text: "Güncelleme yapan : flybuny", iconURL: client.user.avatarURL()})

interaction.reply({embeds: [warn]})

  }
}