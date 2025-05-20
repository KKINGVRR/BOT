const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Ask ChatGPT a question')
    .addStringOption(option => option.setName('question').setDescription('Your question').setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();
    const question = interaction.options.getString('question');
    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4',
        messages: [{ role: 'user', content: question }],
        max_tokens: 300
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      await interaction.editReply(response.data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      await interaction.editReply('Failed to get a response.');
    }
  }
};
