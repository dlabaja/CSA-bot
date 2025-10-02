import { party_members } from "../../generated/prisma";
import {PartyMember} from "../../data/repository/party-member";

export class PartyMemberConverter {
    public static toClient(data: party_members) {
        return new PartyMember({
            partyNumber: data.party_number,
            uuid: data.uuid,
            approverUuid: data.approver_uuid,
            date: data.date
        })
    }
}