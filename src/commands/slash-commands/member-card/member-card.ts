import {ChatInputCommandInteraction, PermissionsBitField} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";
import {SlashCommand} from "../../../data/slash-command";
import {FontWeight, ImageBuilder} from "../../../utils/image-builder";
import {PathManager} from "../../../singletons/path-manager";

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
        switch (interaction.options.getSubcommand()) {
            case "view":
                return await this._view(interaction, command);
            case "add":
                return this._add(interaction, command);
        }
    }
    
    private async _view(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        await interaction.deferReply();
        
        const img = new ImageBuilder();
        await img.load(PathManager.getPath(__dirname, "./member-card.png"))
        img.addText({
            text: interaction.user.displayName,
            fontSize: 24,
            fontWeight: FontWeight.SEMIBOLD,
            color: "#363636",
            x: 200,
            y: 126
        })
        img.addText({
            text: `@${interaction.user.username}`,
            fontSize: 24,
            fontWeight: FontWeight.SEMIBOLD,
            color: "#363636",
            x: 200,
            y: 157
        })

        const attachment = img.toAttachment("image/png", "member-card.png");
        await interaction.editReply({
            content: "Tady máš svou kartu",
            files: [attachment]
        })
    }

    private async _add(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        await interaction.reply({
            content: "Uživatel přidán",
            flags: ["Ephemeral"]
        })
    }
}