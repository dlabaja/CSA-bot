import {ChatInputCommandInteraction} from "discord.js";
import {autowired} from "ironbean";
import {ConfigurationManager} from "../../../../singletons/configuration-manager";
import {PartyMembersRepository} from "../../../../repository/party-members-repository";
import {FontName, FontWeight, ImageBuilder, TextAlign} from "../../../../utils/image-builder/image-builder";
import {PathManager} from "../../../../singletons/path-manager";
import {formatDateTime} from "../../../../utils/date-time";
import {PartyMember} from "../../../../data/repository/party-member";

export class MemberCard {
    @autowired private _configurationManager: ConfigurationManager;
    @autowired private _partyMembersRepository: PartyMembersRepository;
    
    public async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();
        const partyMemberInfo = await this._partyMembersRepository.getPartyMember(BigInt(interaction.user.id));
        if (!partyMemberInfo) {
            await interaction.editReply("You're currently not a party member. Ask someone to add you through **/member add**")
            return;
        }
        
        const img = await this._generateImg(interaction, partyMemberInfo)
        const attachment = img.toAttachment("image/png", "member-card.png");

        await interaction.editReply({
            content: "Here's your card",
            files: [attachment]
        })
    }
    
    private async _generateImg(interaction: ChatInputCommandInteraction, data: PartyMember) {
        const img = new ImageBuilder();
        await img.load(PathManager.getPath(__dirname, "./member-card.png"))
        
        const member = await interaction.guild?.members.fetch(interaction.user.id);
        const approver = await interaction.guild?.members.fetch(data.approverUuid.toString());
        const regionRoles = member?.roles.cache.filter(x => this._configurationManager.regionRoleIds.includes(Number(x.id)));
        const memberRoles = member?.roles.cache.filter(x => this._configurationManager.memberRoleIds.includes(Number(x.id)));
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
        member && img.addText({
            text: member.joinedAt ? formatDateTime(member.joinedAt) : "?",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 185 + yOffset
        })
        regionRoles && img.addText({
            text: regionRoles.map(x => x.name).slice(0, 1).filter(x => x != undefined).join("\n"),
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 250 + yOffset
        })
        memberRoles && img.addText({
            text: memberRoles.map(x => x.name)[0],
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 345 + yOffset
        })
        img.addText({
            text: formatDateTime(data.date),
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 280,
            y: 449 + yOffset
        })
        img.addText({
            text: interaction.options.get("pronouns")?.value?.toString() || "",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 594,
            y: 185 + yOffset
        })
        img.addText({
            text: data.partyNumber.toString(),
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 594,
            y: 249 + yOffset
        })
        img.addText({
            text: interaction.options.get("faction")?.value?.toString() || "",
            fontSize: fontSize,
            fontWeight: fontWeight,
            color: color,
            x: 594,
            y: 315 + yOffset
        })
        approver && img.addText({
            text: approver.displayName || "",
            fontSize: 48 - (approver.displayName.length * 2),
            fontWeight: fontWeight,
            textAlign: TextAlign.CENTER,
            font: FontName.Pacifico,
            color: color,
            x: 696,
            y: 403 + yOffset + 25 - (approver.displayName.length * 2)
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