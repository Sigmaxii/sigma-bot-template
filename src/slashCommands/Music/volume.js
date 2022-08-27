const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('set volume .')
      .addNumberOption(option =>
		     option
		    .setName('number')
		     .setDescription('from 1 to 100')
		     .setRequired(true)
		 ),

  run: async (client, interaction) => {
  await interaction.deferReply({
            ephemeral: true
        });
      if(!interaction.member.voice.channel) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription("You are not connect in vc")]});
      if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) return interaction.editReply({embeds: [new MessageEmbed ().setColor(client.embedColor).setDescription(`You are not connected to <#${interaction.guild.me.voice.channelId}> to use this command.`)]});

    const volumeEmoji = client.emoji.volumehigh;
    const emojivolume = client.emoji.volumehigh;
		
    const vol = interaction.options.getNumber("number");

  	const player = client.manager.get(interaction.guildId);
	  if(!player) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`There is no music playing.`)]
    }).catch(() => {});
    if (!player.queue.current) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`There is no music playing.`)]
    }).catch(() => {});
  const volume = Number(vol);
		if (!volume || volume < 0 || volume > 100) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Usage: ${client.prefix}volume <Number of volume between 0 - 100>`)]
    }).catch(() => {});

   player.setVolume(volume);   
  if (volume > player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume set to: **${volume}%**`)]
    }).catch(() => {});
  else if (volume < player.volume) return await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume set to: **${volume}%**`)]
    }).catch(() => {});
   else 
  await interaction.editReply({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`${emojivolume} Volume set to: **${volume}%**`)]
    }).catch(() => {});
   }
			}
