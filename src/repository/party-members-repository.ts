import {autowired, component} from "ironbean";
import {DatabaseManager} from "../singletons/database-manager";
import {PartyMemberConverter} from "../converters/repository/party-member-converter";
import {IPartyMember, PartyMember} from "../data/repository/party-member";

@component
export class PartyMembersRepository {
    @autowired _databaseManager: DatabaseManager;
    
    public async getPartyMember(uuid: bigint): Promise<PartyMember|null> {
        const data = await this._databaseManager.db.party_members.findUnique({
            where: {uuid}
        })
        return data ? PartyMemberConverter.toClient(data) : null;
    }
    
    public async addPartyMember(data: Omit<IPartyMember, "partyNumber">): Promise<void> {
        await this._databaseManager.db.party_members.upsert({
            where: {uuid: data.uuid},
            update: {},
            create: {
                uuid: data.uuid,
                approver_uuid: data.approverUuid,
                date: data.date
            }
        })
    }
}