const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder().setName('8ball').setDescription('Ask the magic 8-ball')
    .addStringOption(option => option.setName('question').setDescription('Your question').setRequired(true)),
  async execute(interaction) {
    const responses = ['Yes.', 'No.', 'Maybe.', 'Absolutely!', 'Never.'];
    const response = responses[Math.floor(Math.random() * responses.length)];
    await interaction.reply(`🎱 ${response}`);
  }
};
