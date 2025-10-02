import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";
import {SlashCommand} from "../../../data/slash-command";
import {MemberCardView} from "./view/member-card-view";
import { MemberCardAdd } from "./add/member-card-add";
@RegisterSlashCommand({
    name: "member-card",
    description: "Main member card command",
    options: [
        {
            type: SlashCommandOptionType.SUB_COMMAND,
            name: "view",
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
export class MemberCard extends BaseSlashCommand {
    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        switch (interaction.options.getSubcommand()) {
            case "view":
                return await new MemberCardView().execute(interaction);
            case "add":
                return await new MemberCardAdd().execute(interaction);
        }
    }
}