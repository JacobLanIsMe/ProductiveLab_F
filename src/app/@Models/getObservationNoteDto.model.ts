import { ObservationNotePhotoDto } from "./observationNotePhotoDto.model";

export class GetObservationNoteDto{
    constructor(
        public ovumPickupDetailId:string,
        public observationTime:Date,
        public embryologist: string,
        public ovumMaturationId: string,
        public observationTypeId: string,
        public ovumAbnormalityId: string,
        public fertilisationResultId: string,
        public blastomereScore_C_Id: string,
        public blastomereScore_G_Id: string,
        public blastomereScore_F_Id: string,
        public embryoStatusId: string,
        public blastocystScore_Expansion_Id: string,
        public blastocystScore_ICE_Id: string,
        public blastocystScore_TE_Id: string,
        public memo: string,
        public kidScore: string,
        public pgtaNumber: string,
        public pgtaResult: string,
        public pgtmResult: string,
        public operationTypeId: string,
        public day:number,
        public observationNotePhotos: ObservationNotePhotoDto[]
    ){}
}