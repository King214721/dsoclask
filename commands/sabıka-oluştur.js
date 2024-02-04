const db = require("croxydb");
const { EmbedBuilder, IntegrationApplication } = require("discord.js");
module.exports = {
  name: "sabıka-oluştur",
  description: "Sabıka kaydı oluşturursunuz",
  type: 1,
  options: [
    {

      name: "user",
      description: "Kimin hakında işlem başşlatacaksınız",
      type: 6,
      required: true,
    },
    {
      name: "ceza",
      description: "Cezasını buraya yazınız",
      type: 3,
      required: true,
    },
    {
      name: "sebep",
      description: "Sebep buraya yazınız",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    
    const user = interaction.options.getMember('user');
    const ceza = interaction.options.getString('ceza');
    const sebep = interaction.options.getString('sebep');



    const warn = new EmbedBuilder()
    .setAuthor({name: `Başarıyla Oluşturuldu!`, iconURL: user.user.avatarURL()})
    .setDescription(`
<:icons_rules:1143615132413468754> **Bilgileri :**\n> <:yeler:1142134346879340554> **Ad :** ${user}  -  <:ID:1143808005796798524> **ID :** ${user.id}\n\n<:Icons_Guardian:1143615495052992513>  **Yetkil :** <@${interaction.user.id}> \n<:cs_ban:1142094884216508519>  **Cezası :**  ${ceza} \n<:reason:1143808209925185556>   **Sebep :** ${sebep}`)
    .setColor("Green")
    .setFooter({text: "Adli İşlem Başlatıldı! Tüm billgiler kaydedildi.", iconURL: client.user.avatarURL()});

    interaction.reply({embeds: [warn]});

    db.push(`sebep.${user.id}`, `${sebep}`);
    db.push(`sabıkalı.${user.id}`, `${user.id}`);
    db.push(`yetkili.${user.id}`, `${interaction.user.id}`);
    db.push(`cezası.${user.id}`, `${ceza}`);
    db.add(`sabıkasayı.${user.id}`, 1);
  }
}