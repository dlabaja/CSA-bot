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
        const subcommandPermissions = command.getSubcommandPermissions();
        const commandPermissions = command.permissions;
        
        if (!memberPermissions) {
            await interaction.reply("Cannot get permissions");
            return false;
        }
        
        try {
            const subcommand = interaction.options.getSubcommand();
            if (subcommandPermissions[subcommand] && memberPermissions.has(subcommandPermissions[subcommand])) {
                return true;
            }
        }
        catch {}
        
        return !!(commandPermissions && memberPermissions.has(commandPermissions));
    }
}