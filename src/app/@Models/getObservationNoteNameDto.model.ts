import { ObservationNotePhotoDto } from "./observationNotePhotoDto.model";

export class GetObservationNoteNameDto{
    constructor(
        public ovumDetailId:string,
        public observationNoteId:string,
        public observationTime: Date,
        public memo:string,
        public kidScore: string,
        public pgtaNumber: string,
        public pgtaResult: string,
        public pgtmResult:string,
        public day:number,
        public embryologist:string,
        public ovumMaturationName:string,
        public observationTypeName:string,
        public ovumAbnormalityName:string[],
        public fertilisationResultName:string,
        public blastomereScore_C_Name:string,
        public blastomereScore_G_Name:string,
        public blastomereScore_F_Name:string,
        public embryoStatusName:string[],
        public blastocystScore_Expansion_Name:string,
        public blastocystScore_ICE_Name:string,
        public blastocystScore_TE_Name:string,
        public operationTypeName:string[],
        public spindleResult:string,
        public observationNotePhotos:ObservationNotePhotoDto[],
        public ovumNumber:number
    ){}
}