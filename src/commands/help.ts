import {RepliableInteraction} from "discord.js";
import {context} from "../contexts/context";
import {SlashCommandsManager} from "../singletons/slash-commands-manager";

export const HelpCommand = async (interaction: RepliableInteraction) => {
    const commands = context.getBean(SlashCommandsManager);
    await interaction.reply(commands.slashCommands.map(c => `**/${c.name}**: ${c.description}`).join("\n"))
}