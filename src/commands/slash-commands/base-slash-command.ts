import {
    ChatInputCommandInteraction
} from "discord.js";
import {SlashCommand} from "../../data/slash-command";

export abstract class BaseSlashCommand {
    public async executeCommand(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        const hasPermissions = await this._checkPermission(interaction, command);
        if (!hasPermissions) {
            await interaction.reply("Insufficient permissions");
            return;
        }
        await this.execute(interaction, command)
    }
    
    protected abstract execute(interaction: ChatInputCommandInteraction, command: SlashCommand): Promise<void>;
    
    private async _checkPermission(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        const memberPermissions = interaction.memberPermissions;
        const subcommandPermissions = command.subcommandPermissions;
        const commandPermissions = command.permissions;
        const subcommand = interaction.options.getSubcommand();

        if (!memberPermissions) {
            await interaction.reply("Cannot get permissions");
            return false;
        }
        
        try {
            if (subcommandPermissions[subcommand] && memberPermissions.has(subcommandPermissions[subcommand])) {
                return true;
            }
        }
        catch {}
        
        if (!subcommandPermissions[subcommand] && !commandPermissions) {
            return true;
        }
        
        return !!(commandPermissions && memberPermissions.has(commandPermissions));
    }
}