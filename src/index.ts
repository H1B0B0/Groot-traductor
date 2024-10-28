import { Client, GatewayIntentBits } from "discord.js";
import { deployCommands } from "./deploy-commands";
import { commands } from "./commands";
import { config } from "./config";
import { encodeGroot } from "./commands/translator";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once("ready", async () => {
  console.log("Ready!");

  // Deploy commands to all guilds the bot is a part of
  const guilds = await client.guilds.fetch();
  guilds.forEach(async (guild) => {
    try {
      await deployCommands({ guildId: guild.id });
    } catch (error) {
      console.error(`Failed to deploy commands for guild ${guild.id}:`, error);
    }
  });
});

client.on("guildCreate", async (guild) => {
  try {
    await deployCommands({ guildId: guild.id });
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  console.log(`Received command: ${commandName}`);
  if (commands[commandName as keyof typeof commands]) {
    try {
      await commands[commandName as keyof typeof commands].execute(interaction);
      console.log(`Executed command: ${commandName}`);
    } catch (error) {
      console.error(`Error executing command: ${commandName}`, error);
      await interaction.reply({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    }
  } else {
    console.log(`Unknown command: ${commandName}`);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.id === "501100750471168001") {
    const originalText = message.content;
    const encodedText = encodeGroot(originalText);
    const response = `${encodedText} \ntraduction: ||${originalText}||`;

    await message.delete();

    await message.channel.send(response);
  }
});

client.login(config.DISCORD_TOKEN);
