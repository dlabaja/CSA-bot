import {ClientEvents, Events, MessageFlags} from "discord.js";
import {SlashCommandsManager} from "../singletons/slash-commands-manager";
import {BaseEvent} from "./base-event";
import {autowired} from "ironbean";
import {ClientEvent} from "../decorators/client-event-decorator";
import {EventDuration} from "../data/client-event";

@ClientEvent(Events.InteractionCreate, EventDuration.ALWAYS)
export class OnInteractionCreate extends BaseEvent<"interactionCreate"> {
    @autowired private _slashCommandManager: SlashCommandsManager;
    
    public async callback(...args: ClientEvents["interactionCreate"]) {
        const [interaction] = args;

        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = this._slashCommandManager.getCommand(interaction.commandName)
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`)
            return;
        }

        try {
            await command.callback(interaction, command);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "There was an error while executing this command", flags: MessageFlags.Ephemeral });
            } else {
                await interaction.reply({ content: "There was an error while executing this command", flags: MessageFlags.Ephemeral });
            }
        }
    }
}