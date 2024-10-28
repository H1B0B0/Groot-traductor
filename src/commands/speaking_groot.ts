import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { encodeGroot } from "./translator";

export const data = new SlashCommandBuilder()
  .setName("speaking_groot")
  .setDescription("Translate your message to Groot's language")
  .addStringOption((option) =>
    option
      .setName("text")
      .setDescription("The text to translate")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  try {
    console.log("Executing groot command");
    console.log(interaction.options);

    const text = interaction.options.get("text")?.value as string;
    if (!text) {
      throw new Error("Text option is missing");
    }
    console.log(`Text to translate: ${text}`);

    const encodedText = encodeGroot(text);
    console.log(`Encoded text: ${encodedText}`);

    const response = `${encodedText} \ntraduction: ||${text}||`;
    console.log(`Response: ${response}`);

    await interaction.reply(response);
    console.log("Reply sent");
  } catch (error) {
    console.error("Error executing groot command:", error);
    await interaction.reply("An error occurred while executing the command.");
  }
}
