const db = require("croxydb");
const { EmbedBuilder, IntegrationApplication } = require("discord.js");
module.exports = {
  name: "sabıka-sil",
  description: "Sabıka kaydını silersiniz",
  type: 1,
  options: [

{

  name: "user",
  description: "Kimin hakında işlem başşlatacaksınız",
  type: 6,
  required: true,


},
{
  name: "reason",
  description: "sebebini buraya yazınız",
  type: 3,
  required: true
},


  ],
  run: async (client, interaction) => {

 

    
    const user = interaction.options.getMember('user')
    const reason = interaction.options.getString('reason')

const warn = new EmbedBuilder()
.setAuthor({name: `Başarıyla Silindi!`, iconURL: user.user.avatarURL()})
.setDescription(`> <:yeler:1142134346879340554>  **Kişi :** ${user} \n> <:Icons_Guardian:1143615495052992513>  **Yetkil :**<@${interaction.user.id}> \n> <:cs_chat:1142129943568973824>  **Sebep** ${reason} `)
.setColor("Green")
.setFooter({text: "Adli İşlem Başlatıldı! Tüm billgileri silindi.", iconURL: client.user.avatarURL()})

interaction.reply({embeds: [warn]})

db.delete(`sebep.${user.id}`)
db.delete(`yetkili.${user.id}`)
db.delete(`cezası.${user.id}`)
db.delete(`sabıkasayı.${user.id}`)
  }
}