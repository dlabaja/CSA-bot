import {ChatInputCommandInteraction} from "discord.js";
import {SlashCommand} from "../../../../data/slash-command";
import {autowired} from "ironbean";
import {ConfigurationManager} from "../../../../singletons/configuration-manager";
import {PartyMembersRepository} from "../../../../repository/party-members-repository";
import {FontName, FontWeight, ImageBuilder, TextAlign} from "../../../../utils/image-builder/image-builder";
import {PathManager} from "../../../../singletons/path-manager";
import {formatDateTime} from "../../../../utils/date-time";

export class MemberCardView {
    @autowired _configurationManager: ConfigurationManager;
    @autowired _partyMembersRepository: PartyMembersRepository;
    
    public async execute(interaction: ChatInputCommandInteraction, command: SlashCommand) {
        await interaction.deferReply();
        const partyMemberInfo = await this._partyMembersRepository.getPartyMember(BigInt(interaction.user.id));
        if (!partyMemberInfo) {
            await interaction.editReply("Ještě nejsi členem strany")
            return;
        }
        
        const img = await this._generateImg(interaction)
        const attachment = img.toAttachment("image/png", "member-card.png");

        await interaction.editReply({
            content: "Tady máš svou kartu",
            files: [attachment]
        })
    }
    
    private async _generateImg(interaction: ChatInputCommandInteraction) {
        const img = new ImageBuilder();
        await img.load(PathManager.getPath(__dirname, "./member-card.png"))
        
        const member = await interaction.guild?.members.fetch(interaction.user.id);
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
            text: member?.joinedAt ? formatDateTime(member?.joinedAt) : "?",
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
            text: formatDateTime(new Date()),
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
}