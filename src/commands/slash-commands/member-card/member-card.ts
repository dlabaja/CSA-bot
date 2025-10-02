import {ChatInputCommandInteraction, GuildMember, PermissionsBitField} from "discord.js";
import {BaseSlashCommand} from "../base-slash-command";
import {RegisterSlashCommand} from "../../../decorators/register-slash-command";
import {SlashCommandOptionType} from "../../../enums/slash-command-option-type.enum";
import {SlashCommand} from "../../../data/slash-command";
import {PathManager} from "../../../singletons/path-manager";
import {autowired} from "ironbean";
import {ConfigurationManager} from "../../../singletons/configuration-manager";
import {FontName, FontWeight, ImageBuilder, TextAlign} from "../../../utils/image-builder/image-builder";

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
                required: true
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
    @autowired _configurationManager: ConfigurationManager;
    
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
        const member = await interaction.guild?.members.fetch(interaction.user.id);

        const img = await this._generateImg(interaction, member)
        const attachment = img.toAttachment("image/png", "member-card.png");
        
        await interaction.editReply({
            content: "Tady máš svou kartu",
            files: [attachment]
        })
    }
    
    private async _generateImg(interaction: ChatInputCommandInteraction, member?: GuildMember) {
        const img = new ImageBuilder();
        await img.load(PathManager.getPath(__dirname, "./member-card.png"))
        const formatter = new Intl.DateTimeFormat("cs-CZ", {day: "2-digit", month: "2-digit", year: "numeric",});
        const regionRoles = member?.roles.cache.filter(x => this._configurationManager.regionRoleIds.includes(Number(x.id)))
        const color = "#363636";
        const fontWeight = FontWeight.SEMIBOLD;
        const fontSize = 24;
        const xOffset = 10;
        const yOffset = 30;
        
        img.addText({
            text: interaction.user.displayName,
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 182 + xOffset,
            y: 126
        })
        img.addText({
            text: `@${interaction.user.username}`,
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 182 + xOffset,
            y: 157
        })
        img.addText({
            text: interaction.user.id,
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 519 + xOffset,
            y: 79
        })
        img.addText({
            text: member?.joinedAt ? formatter.format(member?.joinedAt) : "?",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 206 + yOffset
        })
        img.addText({
            text: regionRoles ? regionRoles.map(x => x.name)[0] : "",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 270 + yOffset
        })
        img.addText({
            text: formatter.format(new Date()),
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 366 + yOffset
        })
        img.addText({
            text: "1",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 432 + yOffset
        })
        img.addText({
            text: interaction.options.get("pronouns")?.value?.toString() || "",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 615,
            y: 206 + yOffset
        })
        img.addText({
            text: interaction.user.displayName,
            fontSize: 48,
            fontWeight: fontWeight,
            textAlign: TextAlign.CENTER,
            font: FontName.Pacifico,
            color: color,
            x: 699,
            y: 419 + yOffset + 25
        })
        await img.addImage({
            url: interaction.user.avatarURL() || interaction.user.defaultAvatarURL,
            x: 40,
            y: 507 - 300,
            w: 200,
            h: 200
        })
        return img;
    }

    private async _add(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        await interaction.reply({
            content: "Uživatel přidán",
            flags: ["Ephemeral"]
        })
    }
}