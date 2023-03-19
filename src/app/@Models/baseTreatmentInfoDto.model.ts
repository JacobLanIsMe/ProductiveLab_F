export class BaseTreatmentInfoDto{
    constructor(
        public courseOfTreatmentSqlId: number,
        public customerSqlId: number,
        public customerName: string,
        public birthday: Date,
        public spouseSqlId: number|null,
        public spouseName: string,
        public doctor: string,
        public treatmentName: string,
        public memo:string
    ){}
}