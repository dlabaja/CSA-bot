import {RepliableInteraction} from "discord.js";
import {SlashCommandsManager} from "../../../singletons/slash-commands-manager";
import {BaseSlashCommand} from "../base-slash-command";
import {autowired} from "ironbean";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";

@RegisterSlashCommand({
    name: "help",
    description: "Lists all commands"
})
export class HelpCommand extends BaseSlashCommand {
    @autowired private _slashCommandManager: SlashCommandsManager;
    
    async execute(interaction: RepliableInteraction): Promise<void> {
        await interaction.reply(this._slashCommandManager.slashCommands.map(c => `**/${c.name}**: ${c.description}`).join("\n"))
    }
}