import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";
import {SlashCommand} from "../../../data/slash-command";

@RegisterSlashCommand({
    name: "member-card",
    description: "Main member card command",
    options: [
        {
            type: SlashCommandOptionType.SUB_COMMAND,
            name: "view",
            description: "View your member card"
        },
        {
            type: SlashCommandOptionType.SUB_COMMAND,
            name: "add",
            description: "Add a new member to the party member's database, allowing them to generate a member card",
            permissions: new PermissionsBitField("Administrator"),
            options: [{
                type: SlashCommandOptionType.USER,
                name: "user",
                description: "User",
            }]
        },
    ]
})
export class MemberCard extends BaseSlashCommand {
    async execute(interaction: ChatInputCommandInteraction, command: SlashCommand): Promise<void> {
        await interaction.reply(command.name)
    }
}