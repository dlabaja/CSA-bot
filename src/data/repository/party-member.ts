export interface IPartyMember {
    partyNumber: number;
    uuid: bigint;
    approverUuid: bigint;
    date: Date;
}

export class PartyMember {
    public partyNumber: number;
    public uuid: bigint;
    public approverUuid: bigint;
    public date: Date;
    
    constructor(settings: IPartyMember) {
        this.partyNumber = settings.partyNumber;
        this.uuid = settings.uuid;
        this.approverUuid = settings.approverUuid;
        this.date = settings.date;
    }
}