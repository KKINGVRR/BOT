const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.MTM2OTEwODUyMzM1MDIyOTAwMg.GtSkAW.YFVBlOUJyd9AtR8BUViBcf_-6MgtH64ZDgp41A);

(async () => {
  try {
    console.log(`🛠️ Started refreshing ${commands.length} application (/) commands.`);
    await rest.put(
      Routes.applicationGuildCommands(process.env.1369108523350229002, process.env.nh7wt3nYN4B6mda0kedLDE7sY569nsHy),
      { body: commands }
    );
    console.log('✅ Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
