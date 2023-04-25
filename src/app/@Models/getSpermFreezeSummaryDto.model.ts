export class GetSpermFreezeSummaryDto{
    constructor(
        public spermSourceName: string,
        public courseOfTreatmentSqlId: number,
        public spermSituation: string,
        public surgicalTime: Date,
        public freezeTime: Date,
        public vialNumber: number,
        public tankName: string,
        public canistName: string,
        public boxId: number,
        public unitName: string,
        public freezeMediumName: string
    ){}
}