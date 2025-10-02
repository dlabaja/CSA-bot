import {ChatInputCommandInteraction} from "discord.js";
import {autowired} from "ironbean";
import {PartyMembersRepository} from "../../../../repository/party-members-repository";

export class MemberCardAdd {
    @autowired private _partyMembersRepository: PartyMembersRepository;
    
    public async execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.get("user")!.user!;
        await this._partyMembersRepository.addPartyMember({
            uuid: BigInt(user.id),
            approverUuid: BigInt(interaction.user.id),
            date: new Date()
        })
        await interaction.reply({content: "Success", flags: ["Ephemeral"]})
    }
}