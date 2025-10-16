import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";
import {MemberCard} from "./card/member-card";
import { MemberAdd } from "./add/member-add";

@RegisterSlashCommand({
    name: "member",
    description: "Main member command",
    options: [
        {
            type: SlashCommandOptionType.SUB_COMMAND,
            name: "card",
            description: "View your member card",
            options: [{
                type: SlashCommandOptionType.STRING,
                name: "pronouns",
                description: "Your pronouns that will be used in the card (I cannot get this automatically)",
            }]
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
export class Member extends BaseSlashCommand {
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        switch (interaction.options.getSubcommand()) {
            case "card":
                return await new MemberCard().execute(interaction);
            case "add":
                return await new MemberAdd().execute(interaction);
            default:
                await interaction.reply("Subcommand not found")
        }
    }
}