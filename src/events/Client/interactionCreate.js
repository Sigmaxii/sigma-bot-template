const { MessageEmbed, Client,Modal, TextInputComponent, MessageButton, MessageActionRow  } = require("discord.js")
const pre = require("../../schema/prefix.js");
module.exports = async (client, interaction) => {
   
    let prefix = client.prefix;
    const ress =  await pre.findOne({guildid: interaction.guildId})
    if(ress && ress.prefix)prefix = ress.prefix;
   
    let color = client.embedColor;
     
     if(interaction.isCommand()) {

        const SlashCommands = client.slashcommands.get(interaction.commandName);
        if(!SlashCommands) return;
        
        if (SlashCommands.owner && interaction.author.id !== `${client.owner}`) {
          await interaction.editReply({
          content: `Only <@453370780387115019> can use this command!`
        }).catch(() => {});
        }
        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          await interaction.editReply({
          content: `You must be in a voice channel!`
        }).catch(() => {});
        }
        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) { 
           await interaction.editReply({
                    content: `You must be in the same channel as ${interaction.client.user}`
                }).catch(() => {}); 
         }
                
        try {
            await SlashCommands.run(client, interaction);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                }).catch(() => {});
            }
            console.error(error);
        };
    } else return;

  

                            
        


}
