const db = require("croxydb");
const { EmbedBuilder, IntegrationApplication } = require("discord.js");
module.exports = {
  name: "ban",
  description: "Bir kullanıcıyı banlar",
  type: 1,
  options: [
    {
      name: "kişi",
      description: "Banlanacak kullanıcı",
      type: 6,
      required: true,
    },
    {
      name: "sebep",
      description: "Ban sebebi",
      type: 3,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply('- **Bu komutu kullanabilmek için ban yetkisine sahip olmalısınız.** <:cs_reddet:1142405174548254802> ');
    }
    const user = interaction.options.getMember('kişi');
    const reason = interaction.options.getString('sebep');

  
    user.ban({ reason: reason }).then((user) => {
      const embed = new EmbedBuilder()
        .setTitle('Kullanıcı Banlandı')
        .setDescription(`> ${user.tag} adlı kullanıcı yasaklandı! <:cs_ban:1142094884216508519> \n> ${interaction.user.tag} tarafından **yasaklandı.** <:Icons_Guardian:1143615495052992513>  \n> <:reason:1143808209925185556> Sebep: ${reason}`)
        .setColor("RED");
      const modLogChannel = interaction.guild.channels.cache.find(channel => channel.name === "mod-log");
      if (modLogChannel) {
        modLogChannel.send({embeds: [embed]});
      } else {
        interaction.reply('- **Ban log kanalı bulunamadı, bu yüzden banı gizli olarak gerçekleştirdim.** <:cs_warn2:1142138650314952795>');
      }
    }).catch((err) => {
      console.error(err);
      interaction.reply('- **Bu kullanıcıyı banlarken bir hata oluştu.** <:cs_warn2:1142138650314952795>');
    });
  }
}