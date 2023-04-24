import { TreatmentDto } from "./treatmentDto.model";

export class BaseTreatmentInfoDto{
    constructor(
        public courseOfTreatmentSqlId: number,
        public customerSqlId: number,
        public customerName: string,
        public birthday: Date,
        public spouseSqlId: number|null,
        public spouseName: string,
        public doctor: string,
        public treatment: TreatmentDto,
        public memo:string
    ){}
}