import {ClientEvents, MessageFlags} from "discord.js";
import {getBean} from "../contexts/botContext";
import {SlashCommandsManager} from "../singletons/slash-commands-manager";

export async function onInteractionCreate(...props: ClientEvents["interactionCreate"]) {
    const [interaction] = props;
    const slashCommandManager = getBean(SlashCommandsManager);
    
    if (!interaction.isChatInputCommand()) {
        return;
    }
    
    const command = slashCommandManager.getCommand(interaction.commandName)
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.callback(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
        } else {
            await interaction.reply({ content: "There was an error while executing this command!", flags: MessageFlags.Ephemeral });
        }
    }
}