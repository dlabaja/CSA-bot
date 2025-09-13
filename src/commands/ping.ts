import {RepliableInteraction} from "discord.js";

export const PingCommand = async (interaction: RepliableInteraction) => {
    await interaction.reply("Pong!")
}